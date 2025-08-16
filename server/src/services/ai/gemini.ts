import { GoogleGenerativeAI } from '@google/generative-ai'
import { AIProvider, GeneratedQuestion } from './index'

export class GeminiProvider implements AIProvider {
	private modelId: string
	private client: GoogleGenerativeAI

	constructor(apiKey: string, modelId = 'gemini-2.5-flash') {
		this.client = new GoogleGenerativeAI(apiKey)
		this.modelId = modelId
	}

	async generateQuestions({
		type,
		level,
		topic,
		count,
	}: {
		type: 'vocabulary' | 'sentence' | 'grammar'
		level: string
		topic: string
		count: number
	}) {
		const model = this.client.getGenerativeModel({ model: this.modelId })

		// Bitta mustahkam prompt – faqat JSON qaytarishni so‘raymiz
		const prompt = `You are a TOPIK Korean tutor.
Generate ${count} ${type} questions for level ${level} on topic "${topic}".
Return STRICT JSON only, no markdown fences:
{
  "questions": [
    {
      "type": "${type}",
      "level": "${level}",
      "topic": "${topic}",
      "prompt": "",
      "choices": ["A","B","C","D"],
      "answerKey": "A",
      "explanation": ""
    }
  ]
}
Rules:
- Use Korean for prompt/choices/explanations.
- If type is "vocab" or "sentence": include exactly 4 choices and a single answerKey.
- If type is "grammar" (open-ended): "choices" MUST be [], and omit "answerKey".
- Keep content culturally safe.`

		const resp = await model.generateContent({
			contents: [{ role: 'user', parts: [{ text: prompt }] }],
			// JSONni toza holatda olish uchun:
			generationConfig: { responseMimeType: 'application/json' },
		})

		const raw = resp.response.text() // JSON string
		let data: any
		try {
			data = JSON.parse(raw)
		} catch (e) {
			// Ba’zan model JSONni noto‘g‘ri qaytarishi mumkin — diagnostika uchun xulosa qoldiramiz
			throw new Error('Model JSON qaytarmadi. Raw: ' + raw.slice(0, 300))
		}

		const arr = (data.questions || []).map((q: any) =>
			GeneratedQuestion.parse(q)
		)
		return arr
	}
}
