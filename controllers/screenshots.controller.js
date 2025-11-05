const { errorHandler } = require('../helpers/ErrorHandler')
const screenshotsSchema = require('../schemas/screenshots')
const getAllScreenshots = async (req, res) => {
	try {
		const screenshots = await screenshotsSchema.find()
		res.status(200).send({
			message: 'All Screenshots selected.',
			data: { screenshots },
			success: true,
		})
	} catch (error) {
		errorHandler(error, res)
	}
}
const getScreenshotById = async (req, res) => {
	try {
		const id = req.params.id
		const screenshot = await screenshotsSchema.findById(id)
		res.status(200).send({
			message: `Screenshot selected.`,
			data: { screenshot },
			success: true,
		})
	} catch (error) {
		errorHandler(error, res)
	}
}
const createScreenshot = async (req, res) => {
	try {
		const newScreenshot = await screenshotsSchema.create({
			...req.body,
		})
		res.status(201).send({
			message: `New Screenshot created.`,
			data: { created: newScreenshot },
			success: true,
		})
	} catch (error) {
		errorHandler(error, res)
	}
}
const updateScreenshot = async (req, res) => {
	try {
		const id = req.params.id
		const updatedScreenshot = await screenshotsSchema.findOneAndUpdate(
			{ _id: id },
			{
				...req.body,
			},
			{ new: true }
		)
		res.status(200).send({
			message: `Screenshot updated.`,
			data: { updated: updatedScreenshot },
			success: true,
		})
	} catch (error) {
		errorHandler(error, res)
	}
}
const deleteScreenshot = async (req, res) => {
	try {
		const id = req.params.id
		const deletedScreenshot = await screenshotsSchema.findOneAndDelete(id)
		res.status(200).send({
			message: `Screenshot deleted.`,
			data: { deleted: deletedScreenshot },
			success: true,
		})
	} catch (error) {
		errorHandler(error, res)
	}
}
module.exports = {
	getAllScreenshots,
	getScreenshotById,
	createScreenshot,
	updateScreenshot,
	deleteScreenshot,
}
