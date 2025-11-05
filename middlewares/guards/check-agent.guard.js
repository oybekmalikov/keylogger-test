const clientSchema = require('../../schemas/client')
const { verifyToken } = require('../../services/jwt.service')
async function checkAgentGuard(req, res, next) {
	const cert = req.socket.getPeerCertificate()
	if (!req.socket.authorized || !cert.subject) {
		return res.status(401).json({ message: 'Unauthorized client certificate' })
	}

	const { CN } = cert.subject
	const { fingerprint } = cert
	try {
		const agent = await clientSchema.findOne({ cn: CN, fingerprint })
		if (!agent || !agent.isActive) {
			return res.status(403).json({
				message: 'Agent not registered or inactive',
				data: null,
				success: false,
			})
		}
		req.agent = agent
		next()
	} catch (err) {
		next(err)
	}
}

async function agentMTLSCheck(req, res, next) {
	const cert = req.socket.getPeerCertificate()
	if (!cert || !cert.subject) {
		return res.status(401).json({
			message: 'Missing client certificate',
			data: null,
			success: false,
		})
	}

	const CN = cert.subject.CN
	const fingerprint = cert.fingerprint

	const agent = await clientSchema.findOne({ cn: CN, fingerprint })
	if (!agent) {
		return res.status(403).json({
			message: 'Unregistered agent certificate',
			data: null,
			success: false,
		})
	}

	req.agent = agent
	next()
}

async function verifyAgentToken(req, res, next) {
	try {
		const authHeader = req.headers.authorization
		if (!authHeader) {
			return res.status(401).json({
				message: 'Authorization header missing',
				data: null,
				success: false,
			})
		}

		const token = authHeader.split(' ')[1]
		if (!token) {
			return res
				.status(401)
				.json({ message: 'Token missing', data: null, success: false })
		}

		const decoded = verifyToken(token)
		const agent = await clientSchema.findById(decoded.id)

		if (!agent) {
			return res
				.status(403)
				.json({ message: 'Agent not found', data: null, success: false })
		}
		req.agent = agent
		next()
	} catch (err) {
		console.error('verifyAgentToken error:', err.message)
		return res
			.status(403)
			.json({ message: 'Invalid or expired token', data: null, success: false })
	}
}

module.exports = { checkAgentGuard, agentMTLSCheck, verifyAgentToken }
