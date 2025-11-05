const { errorHandler } = require('../helpers/ErrorHandler')
const clientSchema = require('../schemas/client')
const bcrypt = require('bcrypt')
const getAllClients = async (req, res) => {
	try {
		const clients = await clientSchema.find()
		res.status(200).send({
			message: 'All Clients selected.',
			data: { clients },
			success: true,
		})
	} catch (error) {
		errorHandler(error, res)
	}
}
const getClientById = async (req, res) => {
	try {
		const id = req.params.id
		const client = await clientSchema.findById(id)
		res.status(200).send({
			message: `Client selected.`,
			data: { client },
			success: true,
		})
	} catch (error) {
		errorHandler(error, res)
	}
}
const createClient = async (req, res) => {
	try {
		const clientSecret = req.body.client_secret
		const cryptedClientSecret = await bcrypt.hash(clientSecret, 7)
		const newClient = await clientSchema.create({
			...req.body,
			client_secret: cryptedClientSecret,
		})
		res.status(201).send({
			message: `New Client created.`,
			data: { created: newClient },
			success: true,
		})
	} catch (error) {
		errorHandler(error, res)
	}
}
const updateClient = async (req, res) => {
	try {
		const id = req.params.id
		const updatedClient = await clientSchema.findOneAndUpdate(
			{ _id: id },
			{
				...req.body,
			},
			{ new: true }
		)
		res.status(200).send({
			message: `Client updated.`,
			data: { updated: updatedClient },
			success: true,
		})
	} catch (error) {
		errorHandler(error, res)
	}
}
const deleteClient = async (req, res) => {
	try {
		const id = req.params.id
		const deletedClient = await clientSchema.findOneAndDelete(id)
		res.status(200).send({
			message: `Client deleted.`,
			data: { deleted: deletedClient },
			success: true,
		})
	} catch (error) {
		errorHandler(error, res)
	}
}
module.exports = {
	getAllClients,
	getClientById,
	createClient,
	updateClient,
	deleteClient,
}
