const router = require('express').Router()
// const { verifyAgentToken } = require('../middlewares/guards/check-agent.guard')
// router.use('/auth', require('./auth.routes'))
// router.use('/test', require('./file-upload.routes'))
// router.use('/clinet', verifyAgentToken, require('./client.routes'))
// router.use(
// 	'/configurations',
// 	verifyAgentToken,
// 	require('./configuration.routes')
// )
// router.use('/machine', verifyAgentToken, require('./machine.routes'))
// router.use('/upload-queue', verifyAgentToken, require('./upload-queues.routes'))
router.use('/police',require('./police.routes'))
// router.use('/screenshots', verifyAgentToken, require('./screenshots.routes'))
// router.use(
// 	'/keylogger-events',
// 	verifyAgentToken,
// 	require('./keylogger-events.routes')
// )
// router.use(
// 	'/keylogger-sessions',
// 	verifyAgentToken,
// 	require('./keylogger-sessions.routes')
// )
router.use('/', require('./bulk-actions.routes'))
module.exports = router
