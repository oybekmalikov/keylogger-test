const { Schema, model } = require('mongoose')
const creenshotsSchema = new Schema(
	{
		PCName: { type: String },
		ActiveWindowTitle: { type: String },
		ActiveProcessName: { type: String },
		FilePath: { type: String },
	},
	{ versionKey: false, timestamps: true }
)
module.exports = model('screenshots', creenshotsSchema)
