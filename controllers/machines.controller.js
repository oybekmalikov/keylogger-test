const { errorHandler } = require('../helpers/ErrorHandler')
const machinesSchema = require('../schemas/machines')
const getAllMachines = async (req, res) => {
	try {
		const machines = await machinesSchema.find()
		res.status(200).send({
			message: 'All Machines selected.',
			data: { machines },
			success: true,
		})
	} catch (error) {
		errorHandler(error, res)
	}
}
const getMachineById = async (req, res) => {
	try {
		const id = req.params.id
		const machine = await machinesSchema.findById(id)
		res.status(200).send({
			message: `Machine selected.`,
			data: { machine },
			success: true,
		})
	} catch (error) {
		errorHandler(error, res)
	}
}
const createMachine = async (req, res) => {
	try {
		const newMachine = await machinesSchema.create({
			...req.body,
		})
		res.status(201).send({
			message: `New Machine created.`,
			data: { created: newMachine },
			success: true,
		})
	} catch (error) {
		errorHandler(error, res)
	}
}
const updateMachine = async (req, res) => {
	try {
		const id = req.params.id
		const updatedMachine = await machinesSchema.findOneAndUpdate(
			{ _id: id },
			{
				...req.body,
			},
			{ new: true }
		)
		res.status(200).send({
			message: `Machine updated.`,
			data: { updated: updatedMachine },
			success: true,
		})
	} catch (error) {
		errorHandler(error, res)
	}
}
const deleteMachine = async (req, res) => {
	try {
		const id = req.params.id
		const deletedMachine = await machinesSchema.findOneAndDelete(id)
		res.status(200).send({
			message: `Machine deleted.`,
			data: { deleted: deletedMachine },
			success: true,
		})
	} catch (error) {
		errorHandler(error, res)
	}
}
module.exports = {
	getAllMachines,
	getMachineById,
	createMachine,
	updateMachine,
	deleteMachine,
}
