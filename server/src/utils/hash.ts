import crypto from 'crypto'
export function hashQuestion(input: object) {
	const s = JSON.stringify(input)
	return crypto.createHash('sha256').update(s).digest('hex')
}
