const {
	getAllUploadQueues,
	getUploadQueueById,
	createUploadQueue,
	updateUploadQueue,
	deleteUploadQueue,
} = require('../controllers/upload-queues.controller')
const router = require('express').Router()
router.get('/', getAllUploadQueues)
router.get('/:id', getUploadQueueById)
router.post('/', createUploadQueue)
router.patch('/:id', updateUploadQueue)
router.delete('/:id', deleteUploadQueue)
module.exports = router
