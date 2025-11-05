const { errorHandler } = require('../helpers/ErrorHandler')
const configurationsSchema = require('../schemas/configuration')
const getAllConfigurations = async (req, res) => {
	try {
		const configurations = await configurationsSchema.find()
		res.status(200).send({
			message: 'All configurations selected.',
			data: { configurations },
			success: true,
		})
	} catch (error) {
		errorHandler(error, res)
	}
}
const getConfigurationById = async (req, res) => {
	try {
		const id = req.params.id
		const configuration = await configurationsSchema.findById(id)
		res.status(200).send({
			message: `Configuration selected.`,
			data: { configuration },
			success: true,
		})
	} catch (error) {
		errorHandler(error, res)
	}
}
const createConfiguration = async (req, res) => {
	try {
		const newConfiguration = await configurationsSchema.create({
			...req.body,
		})
		res.status(201).send({
			message: `New configuration created.`,
			data: { created: newConfiguration },
			success: true,
		})
	} catch (error) {
		errorHandler(error, res)
	}
}
const updateConfiguration = async (req, res) => {
	try {
		const id = req.params.id
		const updatedConfiguration = await configurationsSchema.findOneAndUpdate(
			{ _id: id },
			{
				...req.body,
			},
			{ new: true }
		)
		res.status(200).send({
			message: `Configuration updated.`,
			data: { updated: updatedConfiguration },
			success: true,
		})
	} catch (error) {
		errorHandler(error, res)
	}
}
const deleteConfiguration = async (req, res) => {
	try {
		const id = req.params.id
		const deletedConfiguration = await configurationsSchema.findOneAndDelete(id)
		res.status(200).send({
			message: `Configuration deleted.`,
			data: { deleted: deletedConfiguration },
			success: true,
		})
	} catch (error) {
		errorHandler(error, res)
	}
}
module.exports = {
	getAllConfigurations,
	getConfigurationById,
	createConfiguration,
	updateConfiguration,
	deleteConfiguration,
}
