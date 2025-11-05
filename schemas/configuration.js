const { Schema, model } = require('mongoose')
const configurationSchema = new Schema(
	{
		name: { type: String },
		value: { type: String },
	},
	{ versionKey: false, timestamps: false }
)
module.exports = model('configurations', configurationSchema)
