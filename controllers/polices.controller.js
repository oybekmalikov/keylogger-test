const { errorHandler } = require('../helpers/ErrorHandler')
const policeSchema = require('../schemas/police')
const getAllPolices = async (req, res) => {
	try {
		const polices = await policeSchema.findOne({ agentName: req.agent.name })
		res.status(200).send({
			message: 'Police selected.',
			data: { polices },
			success: true,
		})
	} catch (error) {
		errorHandler(error, res)
	}
}
const getPoliceById = async (req, res) => {
	try {
		const id = req.params.id
		const police = await policeSchema.findById(id)
		res.status(200).send({
			message: `Police selected.`,
			data: { police },
			success: true,
		})
	} catch (error) {
		errorHandler(error, res)
	}
}
const createPolice = async (req, res) => {
	try {
		const newPolice = await policeSchema.create({
			...req.body,
		})
		res.status(201).send({
			message: `New Police created.`,
			data: { created: newPolice },
			success: true,
		})
	} catch (error) {
		errorHandler(error, res)
	}
}
const updatePolice = async (req, res) => {
	try {
		const id = req.params.id
		const updatedPolice = await policeSchema.findOneAndUpdate(
			{ _id: id },
			{
				...req.body,
			},
			{ new: true }
		)
		res.status(200).send({
			message: `Police updated.`,
			data: { updated: updatedPolice },
			success: true,
		})
	} catch (error) {
		errorHandler(error, res)
	}
}
const deletePolice = async (req, res) => {
	try {
		const id = req.params.id
		const deletedPolice = await policeSchema.findOneAndDelete(id)
		res.status(200).send({
			message: `Police deleted.`,
			data: { deleted: deletedPolice },
			success: true,
		})
	} catch (error) {
		errorHandler(error, res)
	}
}
module.exports = {
	getAllPolices,
	getPoliceById,
	createPolice,
	updatePolice,
	deletePolice,
}
