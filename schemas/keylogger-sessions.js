const { Schema, model } = require('mongoose')
const keyloggerSessionsSchema = new Schema(
	{
		ProcessName: { type: String },
		StartTime: { type: Date },
		EndTime: { type: Date },
		ProcessTitle: { type: String },
		KeyText: { type: String },
		KeyCount: { type: Number },
	},
	{ versionKey: false, timestamps: false }
)
module.exports = model('keylogger_sessions', keyloggerSessionsSchema)
