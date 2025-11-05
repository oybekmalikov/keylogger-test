const fs = require('fs-extra')
const path = require('path')
const FileRecord = require('../schemas/file-record')
const { isSensitive } = require('../services/detector.service')
const {
	genAesKey,
	genIv,
	encryptAesGcm,
	wrapKeyWithRsa,
	sha256,
} = require('../services/encryption.service')

const STORAGE_DIR = path.join(process.cwd(), 'uploads')
fs.ensureDirSync(STORAGE_DIR)

async function uploadHandler(req, res, next) {
	try {
		if (!req.file)
			return res
				.status(400)
				.json({ message: 'No file', data: null, success: false })
		const buffer = await fs.readFile(req.file.path)
		const hash = sha256(buffer)
		const existing = await FileRecord.findOne({ sha256: hash })
		if (existing) {
			await fs.remove(req.file.path)
			return res.json({
				message: 'File already exists',
				data: { fileId: existing._id, dedup: true },
				success: true,
			})
		}
		const detect = isSensitive(buffer, req.file.mimetype)
		if (!detect.sensitive) {
			const dest = path.join(
				STORAGE_DIR,
				`${Date.now()}_${req.file.originalname}`
			)
			await fs.move(req.file.path, dest)
			const rec = await FileRecord.create({
				originalName: req.file.originalname,
				mime: req.file.mimetype,
				size: buffer.length,
				sha256: hash,
				isEncrypted: false,
				storagePath: dest,
			})
			return res.json({
				message: 'File stored (public)',
				fileId: rec._id,
				isEncrypted: false,
			})
		}
		const aesKey = genAesKey()
		const iv = genIv()
		const { encrypted, tag } = encryptAesGcm(buffer, aesKey, iv)
		const wrappedKey = wrapKeyWithRsa(aesKey)
		const filename = `${Date.now()}_${req.file.originalname}.enc`
		const dest = path.join(STORAGE_DIR, filename)
		await fs.writeFile(dest, encrypted)
		await fs.remove(req.file.path)
		const rec = await FileRecord.create({
			originalName: req.file.originalname,
			mime: req.file.mimetype,
			size: buffer.length,
			sha256: hash,
			isEncrypted: true,
			storagePath: dest,
			encryptedKey: wrappedKey.toString('base64'),
			iv: iv.toString('base64'),
			tag: tag.toString('base64'),
			reason: detect.reason,
		})
		return res.json({
			message: 'File stored (encrypted)',
			data: { fileId: rec._id, isEncrypted: true, reason: detect.reason },
			success: true,
		})
	} catch (err) {
		next(err)
	}
}
const {
	unwrapKeyWithRsa,
	decryptAesGcm,
} = require('../services/encryption.service')

async function downloadHandler(req, res, next) {
	try {
		const { id } = req.params
		const rec = await FileRecord.findById(id)
		if (!rec)
			return res
				.status(404)
				.json({ message: 'Not found', data: null, success: false })

		if (!rec.isEncrypted) {
			return res.download(rec.storagePath, rec.originalName)
		}
		const wrappedKey = Buffer.from(rec.encryptedKey, 'base64')
		const aesKey = unwrapKeyWithRsa(wrappedKey)
		const iv = Buffer.from(rec.iv, 'base64')
		const tag = Buffer.from(rec.tag, 'base64')
		const encryptedBuffer = await fs.readFile(rec.storagePath)
		const decrypted = decryptAesGcm(encryptedBuffer, aesKey, iv, tag)

		res.setHeader('Content-Type', rec.mime || 'application/octet-stream')
		res.setHeader(
			'Content-Disposition',
			`attachment; filename="${rec.originalName}"`
		)
		res.send(decrypted)
	} catch (err) {
		next(err)
	}
}

module.exports = { downloadHandler, uploadHandler }
