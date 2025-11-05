const { errorHandler } = require('../helpers/ErrorHandler')
const keyloggerEventSchema = require('../schemas/keylogger-events')
const getAllKeyloggerEvents = async (req, res) => {
	try {
		const keyloggerEvents = await keyloggerEventSchema.find()
		res.status(200).send({
			message: 'All KeyloggerEvents selected.',
			data: { keyloggerEvents },
			success: true,
		})
	} catch (error) {
		errorHandler(error, res)
	}
}
const getKeyloggerEventById = async (req, res) => {
	try {
		const id = req.params.id
		const keyloggerEvent = await keyloggerEventSchema.findById(id)
		res.status(200).send({
			message: `KeyloggerEvent selected.`,
			data: {  keyloggerEvent },
			success: true,
		})
	} catch (error) {
		errorHandler(error, res)
	}
}
const createKeyloggerEvent = async (req, res) => {
	try {
		const newKeyloggerEvent = await keyloggerEventSchema.create({
			...req.body,
		})
		res.status(201).send({
			message: `New KeyloggerEvent created.`,
			data: { created: newKeyloggerEvent },
			success: true,
		})
	} catch (error) {
		errorHandler(error, res)
	}
}
const updateKeyloggerEvent = async (req, res) => {
	try {
		const id = req.params.id
		const updatedKeyloggerEvent = await keyloggerEventSchema.findOneAndUpdate(
			{ _id: id },
			{
				...req.body,
			},
			{ new: true }
		)
		res.status(200).send({
			message: `KeyloggerEvent updated.`,
			data: { updated: updatedKeyloggerEvent },
			success: true,
		})
	} catch (error) {
		errorHandler(error, res)
	}
}
const deleteKeyloggerEvent = async (req, res) => {
	try {
		const id = req.params.id
		const deletedKeyloggerEvent = await keyloggerEventSchema.findOneAndDelete(
			id
		)
		res.status(200).send({
			message: `KeyloggerEvent deleted.`,
			data: { deleted: deletedKeyloggerEvent },
			success: true,
		})
	} catch (error) {
		errorHandler(error, res)
	}
}
module.exports = {
	getAllKeyloggerEvents,
	getKeyloggerEventById,
	createKeyloggerEvent,
	updateKeyloggerEvent,
	deleteKeyloggerEvent,
}
