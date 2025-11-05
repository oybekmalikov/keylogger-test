const { errorHandler } = require('../helpers/ErrorHandler')
const keyloggerSessionSchema = require('../schemas/keylogger-sessions')
const getAllKeyloggerSessions = async (req, res) => {
	try {
		const keyloggerSessions = await keyloggerSessionSchema.find()
		res.status(200).send({
			message: 'All KeyloggerSessions selected.',
			data: { keyloggerSessions },
			success: true,
		})
	} catch (error) {
		errorHandler(error, res)
	}
}
const getKeyloggerSessionById = async (req, res) => {
	try {
		const id = req.params.id
		const keyloggerSession = await keyloggerSessionSchema.findById(id)
		res.status(200).send({
			message: `KeyloggerSession selected.`,
			data: { keyloggerSession },
			success: true,
		})
	} catch (error) {
		errorHandler(error, res)
	}
}
const createKeyloggerSession = async (req, res) => {
	try {
		const newKeyloggerSession = await keyloggerSessionSchema.create({
			...req.body,
		})
		res.status(201).send({
			message: `New KeyloggerSession created.`,
			data: { created: newKeyloggerSession },
			success: true,
		})
	} catch (error) {
		errorHandler(error, res)
	}
}
const updateKeyloggerSession = async (req, res) => {
	try {
		const id = req.params.id
		const updatedKeyloggerSession = await keyloggerSessionSchema.findOneAndUpdate(
			{ _id: id },
			{
				...req.body,
			},
			{ new: true }
		)
		res.status(200).send({
			message: `KeyloggerSession updated.`,
			data: { updated: updatedKeyloggerSession },
			success: true,
		})
	} catch (error) {
		errorHandler(error, res)
	}
}
const deleteKeyloggerSession = async (req, res) => {
	try {
		const id = req.params.id
		const deletedKeyloggerSession = await keyloggerSessionSchema.findOneAndDelete(
			id
		)
		res.status(200).send({
			message: `KeyloggerSession deleted.`,
			data: { deleted: deletedKeyloggerSession },
			success: true,
		})
	} catch (error) {
		errorHandler(error, res)
	}
}
module.exports = {
	getAllKeyloggerSessions,
	getKeyloggerSessionById,
	createKeyloggerSession,
	updateKeyloggerSession,
	deleteKeyloggerSession,
}
