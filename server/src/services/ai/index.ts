import { z } from 'zod'

export const GeneratedQuestion = z.object({
	type: z.enum(['vocabulary', 'sentence', 'grammar']),
	level: z.string(),
	topic: z.string(),
	prompt: z.string(),
	choices: z.array(z.string()).optional().default([]),
	answerKey: z.string().optional(),
	explanation: z.string().optional().default(''),
})
export type GeneratedQuestionT = z.infer<typeof GeneratedQuestion>

export interface AIProvider {
	generateQuestions(params: {
		type: 'vocabulary' | 'sentence' | 'grammar'
		level: string
		topic: string
		count: number
	}): Promise<GeneratedQuestionT[]>
}
