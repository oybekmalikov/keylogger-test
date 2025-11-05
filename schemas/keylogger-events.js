const { Schema, model } = require('mongoose')
const keyloggerEventsSchema = new Schema(
	{
		ProcessName: { type: String },
		ProcessTitle: { type: String },
		KeyText: { type: String },
	},
	{ versionKey: false, timestamps: true }
)
module.exports = model('keylogger_events', keyloggerEventsSchema)
