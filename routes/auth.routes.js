const router = require('express').Router()
const {
	verifyAgentToken,
	agentMTLSCheck,
} = require('../middlewares/guards/check-agent.guard')
const {
	agentLogin,
	getStatus,
	registerAgent,
} = require('../controllers/auth.controller')

router.get('/login', agentMTLSCheck, agentLogin)
router.get('/register', registerAgent)
router.get('/status', verifyAgentToken, getStatus)

module.exports = router
