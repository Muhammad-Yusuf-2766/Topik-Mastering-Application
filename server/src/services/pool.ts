import Question from '../models/Question'
import { hashQuestion } from '../utils/hash'
import { pickRandom } from '../utils/pickRandom'
import type { AIProvider } from './ai'

// 1) kichik qiymatlar
const MIN_POOL = 0 // hozircha zaxira majburiy emas
const TOP_UP_BATCH = 0 // hozircha to'ldirmaymiz
const MAX_GEN_PER_CALL = 10 // bitta AI chaqiruvda ko'p so'ramaslik

type GetParams = {
	type: 'vocabulary' | 'sentence' | 'grammar'
	level: string
	topic: string
	count: number
	ai: AIProvider
}

export async function ensurePoolAndSample({
	type,
	level,
	topic,
	count,
	ai,
}: GetParams) {
	// 1) hozir borini olamiz
	let items = await Question.find({ type, level, topic }).lean()
	let generated = 0

	// 2) yetmasa — faqat yetishmayotgan qismi uchun generatsiya
	if (items.length < count) {
		const need = Math.min(count - items.length, MAX_GEN_PER_CALL) // Ikkala qiymatdan kichigini beradi
		console.time('gen')
		await generateAndInsert({ type, level, topic, count: need, ai })
		console.timeEnd('gen')
		generated = need
		items = await Question.find({ type, level, topic }).lean()
	}

	// 3) random sample va qaytarish
	return { items: pickRandom(items, count), generated }
}

async function generateAndInsert({
	type,
	level,
	topic,
	count,
	ai,
}: {
	type: 'vocabulary' | 'sentence' | 'grammar'
	level: string
	topic: string
	count: number
	ai: AIProvider
}) {
	const generated = await ai.generateQuestions({ type, level, topic, count })

	// hashing & upsert (dublikatdan saqlanish)
	const docs = generated.map(g => ({
		...g,
		source: 'ai',
		review: true,
		hash: hashQuestion({
			type: g.type,
			level: g.level,
			topic: g.topic,
			prompt: g.prompt,
			choices: g.choices,
			answerKey: g.answerKey,
		}),
	}))

	try {
		await Question.insertMany(docs, { ordered: false }) // dublikatda xatoni tashlab, qolganlarini saqlaydi
	} catch {
		// duplicate key error’lar bo‘lishi mumkin — e'tibor bermaymiz
	}
}
