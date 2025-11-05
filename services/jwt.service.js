const jwt = require('jsonwebtoken')

function signToken(payload) {
	return jwt.sign(payload, process.env.TOKEN_KEY, { expiresIn: '1h' })
}

function verifyToken(token) {
	return jwt.verify(token, process.env.TOKEN_KEY)
}

module.exports = { signToken, verifyToken }
