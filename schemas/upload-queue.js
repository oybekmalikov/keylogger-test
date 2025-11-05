const { Schema, model } = require('mongoose')
const uploadQueueSchema = new Schema(
	{
		PayloadType: { type: String },
		PayloadJson: { type: Object },
	},
	{ versionKey: false, timestamps: true }
)
module.exports = model('upload_queue', uploadQueueSchema)
