import { Schema, model, models } from 'mongoose'

export type QuestionType = 'vocabulary' | 'sentence' | 'grammar'

const QuestionSchema = new Schema(
	{
		type: {
			type: String,
			enum: ['vocabulary', 'sentence', 'grammar'],
			required: true,
			index: true,
		},
		level: { type: String, required: true, index: true }, // e.g., TOPIK2
		topic: { type: String, required: true, index: true }, // e.g., "-겠- future"
		prompt: { type: String, required: true },
		choices: { type: [String], default: [] }, // MCQ bo'lsa
		answerKey: { type: String }, // "A" yoki "정답"
		explanation: { type: String, default: '' },
		source: { type: String, enum: ['manual', 'ai'], default: 'ai' },
		review: { type: Boolean, default: true }, // admin tekshiruvi
		hash: { type: String, required: true, unique: true }, // dublikatni oldini olish
	},
	{ timestamps: true }
)

export default models.Question || model('Question', QuestionSchema)
