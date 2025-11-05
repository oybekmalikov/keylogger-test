const {
	getAllKeyloggerSessions,
	getKeyloggerSessionById,
	createKeyloggerSession,
	updateKeyloggerSession,
	deleteKeyloggerSession,
} = require('../controllers/keylogger-sessions.controller')
const router = require('express').Router()
router.get('/', getAllKeyloggerSessions)
router.get('/:id', getKeyloggerSessionById)
router.post('/', createKeyloggerSession)
router.patch('/:id', updateKeyloggerSession)
router.delete('/:id', deleteKeyloggerSession)
module.exports = router
