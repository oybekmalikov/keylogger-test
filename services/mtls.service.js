const fs = require('fs')
const path = require('path')

const mtlsOptions = {
	key: fs.readFileSync(path.join(__dirname, '../../certs/server.key')),
	cert: fs.readFileSync(path.join(__dirname, '../../certs/server.crt')),
	ca: fs.readFileSync(path.join(__dirname, '../../ca/rootCA.crt')),
	requestCert: true,
	rejectUnauthorized: false,
}

module.exports = mtlsOptions
