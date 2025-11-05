
const errorHandler = (error, response) => {
	console.log(error)
	response
		.status(400)
		.send({ message: error.message, data: { error }, sucess: false })
}
module.exports = { errorHandler }
