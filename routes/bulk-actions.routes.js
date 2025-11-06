const multer = require('multer')
const path = require('path')
const router = require('express').Router()
const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', 'public', 'screenshots'), // 👈 '..' qo'shildi!
  filename: (req, file, cb) => {
    cb(null, `screenshot_${Date.now()}${path.extname(file.originalname)}`);
  }
});
const upload = multer({ storage })
const { verifyAgentToken } = require('../middlewares/guards/check-agent.guard')
const {
	bulkGetDatas,
	bulkCreateDatas,
	bulkGetConfigs,
} = require('../controllers/bulk-action.controller')

const { registerAgent } = require('../controllers/auth.controller')

router.post(
	'/create',
	// verifyAgentToken,
	upload.single('screenshot'),
	bulkCreateDatas
)
router.get('/get', verifyAgentToken, bulkGetDatas)
router.get('/get-configs', verifyAgentToken, bulkGetConfigs)
router.post('/login', registerAgent)

module.exports = router
