const router = require('express').Router()
const { verifyAgentToken } = require('../middlewares/guards/check-agent.guard')
const {
	bulkGetDatas,
	bulkCreateDatas,
	bulkGetConfigs,
} = require('../controllers/bulk-action.controller')

const { registerAgent } = require('../controllers/auth.controller')

router.post('/create', verifyAgentToken, bulkCreateDatas)
router.get('/get', verifyAgentToken, bulkGetDatas)
router.get('/get-configs', verifyAgentToken, bulkGetConfigs)
router.post('/login', registerAgent)

module.exports = router
