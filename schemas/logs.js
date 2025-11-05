const { Schema, model } = require('mongoose')
const loggerEntrySchema = new Schema(
	{
		LogLevel: { type: String },
		Message: { type: String },
	},
	{ versionKey: false, timestamps: true }
)
module.exports = model('loggerentry', loggerEntrySchema)
