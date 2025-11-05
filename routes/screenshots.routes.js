const {
	getAllScreenshots,
	getScreenshotById,
	createScreenshot,
	updateScreenshot,
	deleteScreenshot,
} = require('../controllers/screenshots.controller')
const router = require('express').Router()
router.get('/', getAllScreenshots)
router.get('/:id', getScreenshotById)
router.post('/', createScreenshot)
router.patch('/:id', updateScreenshot)
router.delete('/:id', deleteScreenshot)
module.exports = router
