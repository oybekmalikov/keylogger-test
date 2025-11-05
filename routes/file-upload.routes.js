const express = require('express')
const multer = require('multer')
const path = require('path')
const upload = multer({ dest: path.join(process.cwd(), 'tmp_uploads') })
const {
	uploadHandler,
	downloadHandler,
} = require('../controllers/file-upload.controller')

const router = express.Router()
router.post('/upload', upload.single('file'), uploadHandler)
router.get('/files/:id/download', downloadHandler)

module.exports = router
