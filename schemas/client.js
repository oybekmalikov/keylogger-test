// const { Schema, model } = require('mongoose')

// const clientSchema = new Schema(
// 	{
// 		name: { type: String, required: true },
// 		cn: { type: String, required: true },
// 		fingerprint: { type: String, required: true },
// 		organization: { type: String, required: true },
// 		certificate_path: { type: String, required: true },
// 		key_path: { type: String, required: true },
// 		isActive: { type: Boolean, default: true },
// 		lastSeen: { type: Date },
// 	},
// 	{ versionKey: false, timestamps: true }
// )

// module.exports = model('clients', clientSchema)

const { Schema, model } = require('mongoose')

const clientSchema = new Schema(
	{
		PCName: { type: String, unique: true, },
		MachineId: { type: String, },
		temp_token: { type: String, default: '' },
		lastSeen: { type: Date, default: new Date() },
	},
	{ versionKey: false, timestamps: true }
)

module.exports = model('clients', clientSchema)
