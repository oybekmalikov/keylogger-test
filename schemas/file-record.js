const { Schema, model } = require('mongoose')
const fileSchema = new Schema({
  originalName: { type: String },
  mime: { type: String },
  size: { type: Number },
  sha256: { type: String, index: true },
  isEncrypted: { type: Boolean, default: false },
  storagePath: { type: String, required: true },
  encryptedKey: { type: String },
  iv: { type: String },
  tag: { type: String },
  reason: { type: String },
  createdAt: { type: Date, default: () => new Date() },
}, { versionKey: false })

module.exports = model('fiel_record', fileSchema)
