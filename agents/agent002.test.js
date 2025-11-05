const { io } = require('socket.io-client')

const token =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MDFiOGFmNWYyY2JjNWZhYmFkMmVmOCIsIm5hbWUiOiJhZ2VudDAwMiIsImlhdCI6MTc2MTc0MTY3MywiZXhwIjoxNzYxNzQ1MjczfQ.KUZndUrK2S2bhPIm8EZnECzqTJQvOmLwjZADzWolQGE'

const socket = io('https://localhost:3000', {
	auth: { token },
	rejectUnauthorized: false,
	secure: true,
})
socket.on('connect', () => {
	console.log('Connected to socket server')
})

socket.on('config_update', msg => {
	console.log('Received update:', msg)
})

socket.on('disconnect', () => {
	console.log('Disconnected')
})