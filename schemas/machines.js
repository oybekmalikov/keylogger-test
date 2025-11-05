const { Schema, model } = require('mongoose')
const machinesSchema = new Schema(
	{
		PCName: { type: String },
		MachineId: { type: String },
	},
	{ versionKey: false, timestamps: false }
)
module.exports = model('machines', machinesSchema)
