const { Server } = require('socket.io')
const jwt = require('jsonwebtoken')
const { verifyToken } = require('../services/jwt.service')
function setupSocket(server) {
	const io = new Server(server, {
		cors: { origin: '*' },
	})

	io.use(async (socket, next) => {
		try {
			const token = socket.handshake.auth?.token
			// const token = socket.handshake.headers?.auth
			if (!token) return next(new Error('Auth token required'))

			const decoded = verifyToken(token)
			socket.user = decoded
			next()
		} catch (err) {
			next(new Error('Invalid token'))
		}
	})

	io.on('connection', socket => {
		console.log(`Agent connected: ${socket.user.id}`)

		setInterval(() => {
			socket.emit('config_update', {
				screenshot_period_seconds: +(Math.random() * 100).toFixed(0),
				jpeg_quality: +(Math.random() * 100).toFixed(0),
				upload_url: 'https://localhost/api/police',
			})
			console.log(`Config sent -> ${socket.user.name}`)
		}, 5000)

		socket.on('agent_status', data => {
			console.log(`Agent ${socket.user.id} status:`, data)
		})

		socket.on('disconnect', () => {
			console.log(`Agent disconnected: ${socket.user.id}`)
		})
	})
}

module.exports = { setupSocket }
