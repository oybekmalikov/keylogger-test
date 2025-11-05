const { errorHandler } = require('../helpers/ErrorHandler')
const uploadQueuesSchema = require('../schemas/upload-queue')
const getAllUploadQueues = async (req, res) => {
	try {
		const uploadQueues = await uploadQueuesSchema.find()
		res.status(200).send({
			message: 'All UploadQueues selected.',
			data: { uploadQueues },
			success: true,
		})
	} catch (error) {
		errorHandler(error, res)
	}
}
const getUploadQueueById = async (req, res) => {
	try {
		const id = req.params.id
		const uploadQueue = await uploadQueuesSchema.findById(id)
		res.status(200).send({
			message: `UploadQueue selected.`,
			data: { uploadQueue },
			success: true,
		})
	} catch (error) {
		errorHandler(error, res)
	}
}
const createUploadQueue = async (req, res) => {
	try {
		const newUploadQueue = await uploadQueuesSchema.create({
			...req.body,
		})
		res.status(201).send({
			message: `New UploadQueue created.`,
			data: { created: newUploadQueue },
			success: true,
		})
	} catch (error) {
		errorHandler(error, res)
	}
}
const updateUploadQueue = async (req, res) => {
	try {
		const id = req.params.id
		const updatedUploadQueue = await uploadQueuesSchema.findOneAndUpdate(
			{ _id: id },
			{
				...req.body,
			},
			{ new: true }
		)
		res.status(200).send({
			message: `UploadQueue updated.`,
			data: { updated: updatedUploadQueue },
			success: true,
		})
	} catch (error) {
		errorHandler(error, res)
	}
}
const deleteUploadQueue = async (req, res) => {
	try {
		const id = req.params.id
		const deletedUploadQueue = await uploadQueuesSchema.findOneAndDelete(id)
		res.status(200).send({
			message: `UploadQueue deleted.`,
			data: { deleted: deletedUploadQueue },
			success: true,
		})
	} catch (error) {
		errorHandler(error, res)
	}
}
module.exports = {
	getAllUploadQueues,
	getUploadQueueById,
	createUploadQueue,
	updateUploadQueue,
	deleteUploadQueue,
}
