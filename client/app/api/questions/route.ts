import { getQuestionsByFilters } from '@/lib/mock-data'
import { type NextRequest, NextResponse } from 'next/server'

interface QuizQuestion {
	_id: string
	type: string
	level: string
	topic: string
	prompt: string
	choices: string[]
	answerKey: string
	explanation: string
	source: string
	review: boolean
	hash: string
	createdAt: string
	updatedAt: string
}

// Mock questions database - will be replaced with actual database integration
const mockQuestions: QuizQuestion[] = [
	{
		_id: '689f187a23c82dafdef46d9a',
		type: 'sentence',
		level: 'TOPIK2',
		topic: 'grammar-patterns',
		prompt:
			"혼자서는 그 일을 다 못 ______. (Alone, I won't be able to do all that work.)",
		choices: ['A. 하겠어요', 'B. 할 거예요', 'C. 하네요', 'D. 하세요'],
		answerKey: 'A',
		explanation:
			"어떤 일이 불가능하거나 어렵다는 것을 나타낼 때 '-겠-'을 사용하여 화자의 판단이나 상황을 표현할 수 있습니다. 주로 부정문과 함께 쓰입니다.",
		source: 'ai',
		review: true,
		hash: 'ac73200b7ac7a0c5d10a28aa846e593994b9d23a075708116dafec45d2246e44',
		createdAt: '2025-08-15T11:22:34.796Z',
		updatedAt: '2025-08-15T11:22:34.796Z',
	},
	{
		_id: '689f1b0d1b9aefc22f45c3f4',
		type: 'vocabulary',
		level: 'TOPIK5',
		topic: 'family',
		prompt: '남편의 어머니를 뜻하는 가족 호칭은 무엇입니까?',
		choices: ['A. 시어머니', 'B. 친정어머니', 'C. 장모님', 'D. 고모'],
		answerKey: 'A',
		explanation: "'시어머니'는 남편의 어머니를 지칭하는 말입니다.",
		source: 'ai',
		review: true,
		hash: '465e072c1c1ab8cc2019272c384981a2e7a1cb7b927cd3f7c044cb1f218707d3',
		createdAt: '2025-08-15T11:33:33.456Z',
		updatedAt: '2025-08-15T11:33:33.456Z',
	},
	{
		_id: '689f1c2e3d8bfac33g56d4e5',
		type: 'grammar',
		level: 'TOPIK3',
		topic: 'connectors',
		prompt:
			'비가 와서 ______ 집에 있었어요. (It was raining, so I stayed home.)',
		choices: ['A. 그래서', 'B. 그러나', 'C. 그런데', 'D. 그러면'],
		answerKey: 'A',
		explanation:
			"'그래서'는 앞의 내용이 뒤의 내용의 원인이나 이유가 될 때 사용하는 연결어미입니다.",
		source: 'ai',
		review: true,
		hash: '576e183d2c2bc9d44e67e45f3b8c92f4c6d8a3b186e819c227eaf56f329818e5',
		createdAt: '2025-08-15T11:35:45.123Z',
		updatedAt: '2025-08-15T11:35:45.123Z',
	},
	{
		_id: '689f1d3f4e9cgbd44h67f5g6',
		type: 'vocabulary',
		level: 'TOPIK1',
		topic: 'food',
		prompt: "한국의 전통 음식 중 하나인 '김치'의 주재료는 무엇입니까?",
		choices: ['A. 배추', 'B. 무', 'C. 오이', 'D. 당근'],
		answerKey: 'A',
		explanation:
			'김치의 주재료는 배추입니다. 배추김치는 한국의 대표적인 전통 음식입니다.',
		source: 'ai',
		review: true,
		hash: '687f294e4d3ce0e55f78g67h4c9d03g5d7e9b4c297f405d338fbg67h440929f6',
		createdAt: '2025-08-15T11:37:12.789Z',
		updatedAt: '2025-08-15T11:37:12.789Z',
	},
	{
		_id: '689f1e4g5f0dhce55i78g6h7',
		type: 'sentence',
		level: 'TOPIK4',
		topic: 'time-expressions',
		prompt:
			'내일 ______ 친구를 만날 예정입니다. (I plan to meet a friend tomorrow.)',
		choices: ['A. 에', 'B. 에서', 'C. 으로', 'D. 부터'],
		answerKey: 'A',
		explanation: "시간을 나타내는 명사 뒤에는 조사 '에'를 사용합니다.",
		source: 'ai',
		review: true,
		hash: '798g305f5e4df1f66g89h78i5d0e14h6e8f0c5d308g516e449gch78i551040g7',
		createdAt: '2025-08-15T11:39:28.456Z',
		updatedAt: '2025-08-15T11:39:28.456Z',
	},
	{
		_id: '689f1f5h6g1eide66j89h7i8',
		type: 'grammar',
		level: 'TOPIK6',
		topic: 'advanced-grammar',
		prompt:
			"그 사람은 열심히 공부하는 ______ 성적이 좋지 않다. (Despite studying hard, that person's grades are not good.)",
		choices: ['A. 데도 불구하고', 'B. 것 같다', 'C. 지 않다', 'D. 기 때문에'],
		answerKey: 'A',
		explanation:
			"'데도 불구하고'는 앞의 내용과 반대되는 결과를 나타낼 때 사용하는 고급 문법입니다.",
		source: 'ai',
		review: true,
		hash: '809h416g6f5eg2g77h90i89j6e1f25i7f9g1d6e419h627f550hdi89j662151h8',
		createdAt: '2025-08-15T11:41:45.321Z',
		updatedAt: '2025-08-15T11:41:45.321Z',
	},
]

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url)

		// Extract query parameters
		const type = searchParams.get('type') || ''
		const level = searchParams.get('level') || ''
		const topic = searchParams.get('topic') || ''
		const page = Number.parseInt(searchParams.get('page') || '1')
		const limit = Number.parseInt(searchParams.get('limit') || '10')
		const customTopic = searchParams.get('customTopic') || ''

		const result = getQuestionsByFilters(
			type,
			level,
			topic === 'custom' ? undefined : topic,
			page,
			limit
		)

		let questions = result.questions

		// For custom topics, we would generate questions based on the custom topic
		if (customTopic) {
			questions = questions.map(q => ({
				...q,
				topic: customTopic,
				_id: q._id + '_custom_' + Date.now(),
			}))
		}

		// Simulate database delay
		await new Promise(resolve => setTimeout(resolve, 500))

		return NextResponse.json({
			success: true,
			data: {
				questions,
				pagination: {
					currentPage: page,
					totalPages: Math.ceil(result.total / limit),
					totalQuestions: result.total,
					hasMore: result.hasMore,
				},
				filters: {
					type,
					level,
					topic: customTopic || topic,
				},
			},
		})
	} catch (error) {
		console.error('Error fetching questions:', error)
		return NextResponse.json(
			{
				success: false,
				error: 'Failed to fetch questions',
				message: error instanceof Error ? error.message : 'Unknown error',
			},
			{ status: 500 }
		)
	}
}

export async function POST(request: NextRequest) {
	try {
		const body = await request.json()
		const { type, level, topic, customTopic, batchSize = 10 } = body

		const result = getQuestionsByFilters(
			type,
			level,
			topic === 'custom' ? undefined : topic,
			1,
			batchSize
		)
		let questions = result.questions

		if (customTopic) {
			questions = questions.map(q => ({
				...q,
				topic: customTopic,
				_id: q._id + '_generated_' + Date.now(),
				prompt: `${q.prompt} (Generated for: ${customTopic})`,
			}))
		}

		await new Promise(resolve => setTimeout(resolve, 800))

		return NextResponse.json({
			success: true,
			data: {
				questions,
				generated: true,
				batchSize: questions.length,
				filters: {
					type,
					level,
					topic: customTopic || topic,
				},
			},
		})
	} catch (error) {
		console.error('Error generating questions:', error)
		return NextResponse.json(
			{
				success: false,
				error: 'Failed to generate questions',
				message: error instanceof Error ? error.message : 'Unknown error',
			},
			{ status: 500 }
		)
	}
}
