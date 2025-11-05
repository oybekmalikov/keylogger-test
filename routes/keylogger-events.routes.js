const {
	getAllKeyloggerEvents,
	getKeyloggerEventById,
	createKeyloggerEvent,
	updateKeyloggerEvent,
	deleteKeyloggerEvent,
} = require('../controllers/keylogger-events.controller')
const router = require('express').Router()
router.get('/', getAllKeyloggerEvents)
router.get('/:id', getKeyloggerEventById)
router.post('/', createKeyloggerEvent)
router.patch('/:id', updateKeyloggerEvent)
router.delete('/:id', deleteKeyloggerEvent)
module.exports = router
