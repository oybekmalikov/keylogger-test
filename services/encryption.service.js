const crypto = require('crypto')
const fs = require('fs')
const path = require('path')

const RSA_PUBLIC_PATH = path.join(process.cwd(), 'ca', 'server_pub.pem')
const RSA_PRIVATE_PATH = path.join(process.cwd(), 'ca', 'server_priv.pem')

function genAesKey() {
  return crypto.randomBytes(32)
}
function genIv() {
  return crypto.randomBytes(12)
}

function encryptAesGcm(buffer, key, iv) {
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv)
  const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()])
  const tag = cipher.getAuthTag()
  return { encrypted, tag }
}

function decryptAesGcm(encrypted, key, iv, tag) {
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv)
  decipher.setAuthTag(tag)
  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()])
  return decrypted
}

function wrapKeyWithRsa(keyBuffer) {
  const pub = fs.readFileSync(RSA_PUBLIC_PATH)
  return crypto.publicEncrypt({ key: pub, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING, oaepHash: 'sha256' }, keyBuffer)
}

function unwrapKeyWithRsa(encryptedKeyBuffer) {
  const priv = fs.readFileSync(RSA_PRIVATE_PATH)
  return crypto.privateDecrypt({ key: priv, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING, oaepHash: 'sha256' }, encryptedKeyBuffer)
}

function sha256(buffer) {
  return crypto.createHash('sha256').update(buffer).digest('hex')
}

module.exports = {
  genAesKey,
  genIv,
  encryptAesGcm,
  decryptAesGcm,
  wrapKeyWithRsa,
  unwrapKeyWithRsa,
  sha256,
}
