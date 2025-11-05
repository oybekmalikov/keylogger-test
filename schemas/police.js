const { Schema, model } = require('mongoose')
const policeSchema = new Schema(
	{
		SenderInterval: { type: Number },
		ScreenshotInterval: { type: Number },
		JpegQuality: { type: Number },
		// ScreenshotPath: { type: String },
		KeyLoggerSessionIdle: { type: Number },
		KeyLoggerEnableRawEvents: { type: Boolean },
		// DataPath: { type: String },
		UploadUrl: { type: String },
		AuthToken: { type: String },
		OnChangedWindow: { type: String },
	},
	{ versionKey: false, timestamps: true }
)
module.exports = model('police', policeSchema)
