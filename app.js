// require('dotenv').config()
// const express = require('express')
// const https = require('https')
// const fs = require('fs')
// const path = require('path')
// const mongoose = require('mongoose')
// const cookieParser = require('cookie-parser')
// const mainRouter = require('./routes/index.routes')
// const errorHandling = require('./middlewares/errors/error.handler')
// const mtlsOptions = {
// 	key: fs.readFileSync(path.join(__dirname, 'certs/server.key')),
// 	cert: fs.readFileSync(path.join(__dirname, 'certs/server.crt')),
// 	ca: fs.readFileSync(path.join(__dirname, 'ca/rootCA.crt')),
// 	requestCert: true,
// 	rejectUnauthorized: false,
// }
// const { setupSocket } = require('./sockets/agent.socket')
// const PORT = process.env.PORT || 8443
// const app = express()
// app.use(express.json())
// app.use(cookieParser())
// app.use('/api', mainRouter)
// app.use(errorHandling)

// async function start() {
// 	try {
// 		await mongoose.connect(process.env.DB_URI)
// 		const server = https.createServer(mtlsOptions, app)
// 		setupSocket(server)
// 		server.listen(PORT, () => {
// 			console.log(`Server running on https://localhost:${PORT}`)
// 		})
// 	} catch (error) {
// 		console.error('Error on starting server:', error)
// 	}
// }
// start()

require('dotenv').config()
const express = require('express')
const http = require('http')
const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const mainRouter = require('./routes/index.routes')
const errorHandling = require('./middlewares/errors/error.handler')
const rtcSocketInit = require('./sockets/rtc.socket')
// const mtlsOptions = {
// 	key: fs.readFileSync(path.join(__dirname, 'certs/server.key')),
// 	cert: fs.readFileSync(path.join(__dirname, 'certs/server.crt')),
// 	ca: fs.readFileSync(path.join(__dirname, 'ca/rootCA.crt')),
// 	requestCert: true,
// 	rejectUnauthorized: false,
// }

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use('/api', mainRouter)
app.use(errorHandling)

app.use(express.static(path.join(__dirname, 'public')))

async function start() {
	try {
		await mongoose.connect(process.env.DB_URI)
		const server = http.createServer(app)
		// const server = https.createServer(mtlsOptions, app);
		rtcSocketInit(server)
		server.listen(PORT, () => {
			console.log(`Server running on http://localhost:${PORT}`)
		})
	} catch (error) {
		console.error('Error on starting server:', error)
	}
}
start()
