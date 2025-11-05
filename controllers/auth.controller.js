const { signToken } = require('../services/jwt.service')
const clientSchema = require('../schemas/client')
const policeSchema = require('../schemas/police')
// const { execSync } = require('child_process')
// const fs = require('fs')
// const path = require('path')
const { errorHandler } = require('../helpers/ErrorHandler')
const registerAgent = async (req, res) => {
	try {
		const { MachineId, PCName } = req.body
		const availableAgent = await clientSchema.findOne({
			PCName,
			MachineId,
		})
		if (!availableAgent) {
			const newAgent = await clientSchema.create({
				PCName,
				MachineId,
			})
			const token = signToken({
				id: newAgent._id,
				pc_name: newAgent.PCName,
				machine_id: newAgent.MachineId,
			})
			newAgent.temp_token = token
			newAgent.save()
			return res.status(201).send({
				message: 'SUCCESS',
				data: { token },
				success: true,
			})
		}
		if (
			availableAgent.PCName !== PCName ||
			availableAgent.MachineId !== MachineId
		) {
			res.status(403).send({
				message: 'PCName or MachineId incorrect!',
				data: null,
				success: false,
			})
		}
		const token = signToken({
			id: availableAgent._id,
			pc_name: availableAgent.PCName,
			machine_id: availableAgent.MachineId,
		})
		availableAgent.temp_token = token
		const police = await policeSchema.findById('6909e6904c09bff90905218c')
		police.AuthToken = token
		police.save()
		availableAgent.save()

		res.status(200).send({
			message: 'SUCCESS',
			data: { AuthToken: token },
			success: true,
		})
	} catch (error) {
		errorHandler(error, res)
	}
}

// const agentLogin = async (req, res, next) => {
// 	try {
// 		const { name, fingerprint } = req.agent
// 		const agent = await clientSchema.findOne({ name, fingerprint })
// 		if (!agent) {
// 			return res.status(404).json({
// 				message: 'Agent not found',
// 				data: null,
// 				success: false,
// 			})
// 		}
// 		const token = signToken({ id: agent._id, name: agent.name })
// 		agent.lastSeen = new Date()
// 		await agent.save()
// 		res.json({
// 			message: 'Agent authenticated successfully',
// 			data: { token },
// 			success: true,
// 		})
// 	} catch (err) {
// 		next(err)
// 	}
// }

// const registerAgent = async (req, res) => {
// 	try {
// 		const { name, organization } = req.body

// 		if (!name || !organization) {
// 			return res.status(400).json({
// 				message: 'Name and organization are required',
// 				data: null,
// 				success: false,
// 			})
// 		}
// 		const certsDir = path.join(process.cwd(), 'certs')
// 		if (!fs.existsSync(certsDir)) fs.mkdirSync(certsDir, { recursive: true })
// 		const caKeyPath = path.join(certsDir, 'ca.key')
// 		const caCrtPath = path.join(certsDir, 'ca.crt')

// 		if (!fs.existsSync(caKeyPath) || !fs.existsSync(caCrtPath)) {
// 			execSync(`openssl genrsa -out ${caKeyPath} 4096`)
// 			execSync(
// 				`openssl req -x509 -new -nodes -key ${caKeyPath} -sha256 -days 3650 -out ${caCrtPath} -subj "/CN=Datagaze CA/O=Datagaze Security"`
// 			)
// 		}
// 		const agentDir = path.join(certsDir, name)
// 		fs.mkdirSync(agentDir, { recursive: true })
// 		const keyPath = path.join(agentDir, `${name}.key`)
// 		const csrPath = path.join(agentDir, `${name}.csr`)
// 		const crtPath = path.join(agentDir, `${name}.crt`)
// 		execSync(`openssl genrsa -out ${keyPath} 2048`)
// 		execSync(
// 			`openssl req -new -key ${keyPath} -subj "/CN=${name}/O=${organization}" -out ${csrPath}`
// 		)

// 		execSync(
// 			`openssl x509 -req -in ${csrPath} -CA ${caCrtPath} -CAkey ${caKeyPath} -CAcreateserial -out ${crtPath} -days 365 -sha256`
// 		)
// 		const fingerprint = execSync(
// 			`openssl x509 -in ${crtPath} -noout -fingerprint`
// 		)
// 			.toString()
// 			.trim()
// 			.replace('SHA1 Fingerprint=', '')
// 		const cn = name

// 		const agent = await clientSchema.create({
// 			name,
// 			cn,
// 			fingerprint,
// 			organization,
// 			certificate_path: crtPath,
// 			key_path: keyPath,
// 			isActive: true,
// 			lastSeen: new Date(),
// 		})

// 		return res.status(201).json({
// 			message: 'Agent registered successfully',
// 			data: {
// 				id: agent.id,
// 				name: agent.name,
// 				organization: agent.organization,
// 				certificate: crtPath,
// 				key: keyPath,
// 			},
// 			success: true,
// 		})
// 	} catch (error) {
// 		console.error('Register error:', error)
// 		return res.status(500).json({
// 			message: 'Failed to register agent',
// 			data: { error: error?.message },
// 			success: false,
// 		})
// 	}
// }

// const getStatus = async (req, res) => {
// 	res.json({
// 		message: `Hello ${req.agent.cn}`,
// 		status: 'Active',
// 		lastSeen: req.agent.lastSeen,
// 	})
// }
module.exports = { registerAgent }
