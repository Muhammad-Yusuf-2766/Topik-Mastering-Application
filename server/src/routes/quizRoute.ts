import { Router } from 'express'
import { z } from 'zod'
import Question from '../models/Question'
import { GeminiProvider } from '../services/ai/gemini'
import { ensurePoolAndSample } from '../services/pool'

const router = Router()

const Query = z.object({
	type: z.enum(['vocabulary', 'sentence', 'grammar']),
	level: z.string().min(1),
	topic: z.string().min(1),
	count: z.coerce.number().min(1).max(50).default(10),
})

router.get('/quiz', async (req, res) => {
	console.log('QUIZ request:')
	const parsed = Query.safeParse(req.query)
	if (!parsed.success)
		return res.status(400).json({ error: parsed.error.flatten() })

	const { type, level, topic, count } = parsed.data
	const ai = new GeminiProvider(process.env.GEMINI_API_KEY!) // yoki GroqProvider

	try {
		const items = await ensurePoolAndSample({ type, level, topic, count, ai })
		res.json({ ok: true, items })
	} catch (e: any) {
		res.status(500).json({ ok: false, error: e?.message || 'Internal error' })
	}
})

router.get('/quiz-topics', async (req, res) => {
	try {
		const { type } = req.query
		// const topics = await Question.find({ type }).distinct('topic')
		// const topics = await Question.distinct('topic', { type }) // same with above
		const topics = await Question.aggregate([
			{ $match: { type } }, // faqat shu turdagi savollar
			{
				$group: {
					_id: '$topic', // topic bo‘yicha guruhlash
					questionCount: { $sum: 1 }, // har bitta hujjat = 1 ta savol
				},
			},
			{
				$project: {
					_id: 0,
					name: '$_id', // _id ni topic deb qaytarish
					questionCount: 1,
				},
			},
		])
		res.json({ ok: true, topics: topics })
	} catch (error) {}
})

export default router
