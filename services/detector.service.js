const ccRegex = /\b(?:\d[ -]*?){13,19}\b/g
const emailRegex = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i
const phoneRegex = /\+?\d{7,15}/g
const passportRegex = /\b[A-Z]{1,2}\d{5,9}\b/g
const keywords = [
  'passport',
  'social security',
  'ssn',
  'credit card',
  'card number',
  'account number',
  'confidential',
  'internal use only',
  'salary',
  'secret',
  'proprietary',
  'api_key',
]
function luhnCheck(ccNum) {
  const s = ccNum.replace(/\D/g, '')
  let sum = 0, flip = false
  for (let i = s.length - 1; i >= 0; i--) {
    let n = parseInt(s[i], 10)
    if (flip) {
      n *= 2
      if (n > 9) n -= 9
    }
    sum += n
    flip = !flip
  }
  return sum % 10 === 0
}
function hasCreditCardCandidates(text) {
  const matches = text.match(ccRegex) || []
  for (const m of matches) {
    const digits = m.replace(/\D/g, '')
    if (digits.length >= 13 && digits.length <= 19) {
      if (luhnCheck(digits)) return true
    }
  }
  return false
}
function hasKeywords(text) {
  const low = text.toLowerCase()
  return keywords.some(k => low.includes(k))
}
function isSensitive(buffer, mime) {
  const text = buffer.toString('utf8', 0, Math.min(buffer.length, 20000)) // cap
  if (hasCreditCardCandidates(text)) return { sensitive: true, reason: 'credit_card' }
  if ((text.match(passportRegex) || []).length > 0) return { sensitive: true, reason: 'passport_like' }
  if (emailRegex.test(text) && hasKeywords(text)) return { sensitive: true, reason: 'personal+keyword' }
  if (hasKeywords(text)) return { sensitive: true, reason: 'keywords' }
  if (phoneRegex.test(text) && hasKeywords(text)) return { sensitive: true, reason: 'phone+keyword' }
  if (mime === 'application/pdf') return { sensitive: true, reason: 'pdf_requires_scan' }
  return { sensitive: false }
}

module.exports = { isSensitive }
