'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import {
	ArrowLeft,
	ArrowRight,
	CheckCircle,
	RotateCcw,
	XCircle,
} from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { use, useEffect, useState } from 'react'

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

export default function QuizStartPage({
	params,
}: {
	params: Promise<{ type: string; level: string; topic: string }>
}) {
	const { type } = use(params) // ✅ endi to‘g‘ri
	const searchParams = useSearchParams()
	const level = searchParams.get('level')
	const topic = searchParams.get('topic')

	const [questions, setQuestions] = useState<QuizQuestion[]>([])
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
	const [selectedAnswer, setSelectedAnswer] = useState<string>('')
	const [showResult, setShowResult] = useState(false)
	const [score, setScore] = useState({ correct: 0, total: 0 })
	const [loading, setLoading] = useState(true)
	const [loadingMore, setLoadingMore] = useState(false)

	// Mock questions data - will be replaced with API calls
	const mockQuestions: QuizQuestion[] = [
		{
			_id: '689f187a23c82dafdef46d9a',
			type: 'sentence',
			level: 'TOPIK2',
			topic: '-겠-',
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
			type: 'vocab',
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
			topic: '연결어미',
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
	]

	useEffect(() => {
		const fetchQuestions = async () => {
			setLoading(true)
			try {
				const response = await fetch(
					`http://localhost:4000/api/quiz?type=${type}&level=${level}&topic=${topic}&count=5`
				)

				if (!response.ok) {
					throw new Error('Failed to fetch topics')
				}
				const data = await response.json()
				setQuestions(data.items.items)
			} catch (error) {
				console.error('Failed to fetch questions:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchQuestions()
	}, [level, topic, type])

	const fetchMoreQuestions = async () => {
		setLoadingMore(true)
		try {
			// Simulate API call for more questions
			await new Promise(resolve => setTimeout(resolve, 1000))
			const moreQuestions = [...mockQuestions].map(q => ({
				...q,
				_id: q._id + '_' + Date.now(),
				prompt: q.prompt + ' (Additional question)',
			}))
			setQuestions(prev => [...prev, ...moreQuestions])
		} catch (error) {
			console.error('Failed to fetch more questions:', error)
		} finally {
			setLoadingMore(false)
		}
	}

	const handleAnswerSelect = (answer: string) => {
		if (showResult) return
		setSelectedAnswer(answer)
	}

	const handleSubmitAnswer = () => {
		if (!selectedAnswer) return

		const currentQuestion = questions[currentQuestionIndex]
		const isCorrect = selectedAnswer === currentQuestion.answerKey

		setScore(prev => ({
			correct: prev.correct + (isCorrect ? 1 : 0),
			total: prev.total + 1,
		}))

		setShowResult(true)
	}

	const handleNextQuestion = () => {
		if (currentQuestionIndex < questions.length - 1) {
			setCurrentQuestionIndex(currentQuestionIndex + 1)
			setSelectedAnswer('')
			setShowResult(false)
		}
	}

	const handleContinue = () => {
		if (currentQuestionIndex >= questions.length - 1) {
			fetchMoreQuestions()
		}
		handleNextQuestion()
	}

	const resetQuiz = () => {
		setCurrentQuestionIndex(0)
		setSelectedAnswer('')
		setShowResult(false)
		setScore({ correct: 0, total: 0 })
	}

	if (loading) {
		return (
			<div className='min-h-screen bg-background flex items-center justify-center'>
				<Card className='max-w-md'>
					<CardContent className='p-6 text-center'>
						<div className='animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4'></div>
						<p className='text-muted-foreground'>Loading questions...</p>
					</CardContent>
				</Card>
			</div>
		)
	}

	if (questions.length === 0) {
		return (
			<div className='min-h-screen bg-background flex items-center justify-center'>
				<Card className='max-w-md'>
					<CardHeader>
						<CardTitle>No Questions Available</CardTitle>
						<CardDescription>
							No questions found for the selected criteria.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Link href={`/quiz/${type}`}>
							<Button className='w-full'>Try Different Settings</Button>
						</Link>
					</CardContent>
				</Card>
			</div>
		)
	}

	const currentQuestion = questions[currentQuestionIndex]
	const isCorrect = selectedAnswer === currentQuestion.answerKey
	const progressPercentage =
		((currentQuestionIndex + 1) / questions.length) * 100

	return (
		<div className='min-h-screen bg-background'>
			{/* Header */}
			<header className='border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50'>
				<div className='container mx-auto px-4 py-4'>
					<div className='flex items-center justify-between'>
						<Link href={`/quiz/${type}`}>
							<Button variant='ghost' size='sm' className='gap-2'>
								<ArrowLeft className='w-4 h-4' />
								Back
							</Button>
						</Link>
						<div className='flex items-center gap-4'>
							<Badge variant='outline'>{level}</Badge>
							<Badge variant='secondary'>{topic}</Badge>
							<div className='text-sm text-muted-foreground'>
								Score: {score.correct}/{score.total}
							</div>
						</div>
					</div>
				</div>
			</header>

			<div className='container mx-auto px-4 py-8 max-w-4xl'>
				{/* Progress */}
				<div className='mb-8'>
					<div className='flex items-center justify-between mb-2'>
						<span className='text-sm font-medium text-foreground'>
							Question {currentQuestionIndex + 1} of {questions.length}
						</span>
						<Button
							variant='ghost'
							size='sm'
							onClick={resetQuiz}
							className='gap-2'
						>
							<RotateCcw className='w-4 h-4' />
							Reset
						</Button>
					</div>
					<Progress value={progressPercentage} className='h-2' />
				</div>

				{/* Question Card */}
				<Card className='mb-6'>
					<CardHeader>
						<div className='flex items-center gap-2 mb-2'>
							<Badge variant='outline' className='text-xs'>
								{currentQuestion.type}
							</Badge>
							<Badge variant='secondary' className='text-xs'>
								{currentQuestion.level}
							</Badge>
						</div>
						<CardTitle className='text-xl leading-relaxed'>
							{currentQuestion.prompt}
						</CardTitle>
					</CardHeader>
					<CardContent className='space-y-3'>
						{currentQuestion.choices.map((choice, index) => {
							const choiceLetter = choice.charAt(0) // Stringdan birinchi harfni olyapti. A-B-C-D
							const isSelected = selectedAnswer === choiceLetter
							const isCorrectAnswer = choiceLetter === currentQuestion.answerKey
							const showCorrectness = showResult

							return (
								<button
									key={index}
									onClick={() => handleAnswerSelect(choiceLetter)}
									disabled={showResult}
									className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
										showCorrectness
											? isCorrectAnswer
												? 'border-green-500 bg-green-50 text-green-900'
												: isSelected
												? 'border-red-500 bg-red-50 text-red-900'
												: 'border-border bg-background'
											: isSelected
											? 'border-primary bg-primary/5 text-primary'
											: 'border-border bg-background hover:border-primary/50 hover:bg-muted/50'
									}`}
								>
									<div className='flex items-center gap-3'>
										<div
											className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
												showCorrectness
													? isCorrectAnswer
														? 'border-green-500 bg-green-500 text-white'
														: isSelected
														? 'border-red-500 bg-red-500 text-white'
														: 'border-muted-foreground'
													: isSelected
													? 'border-primary bg-primary text-primary-foreground'
													: 'border-muted-foreground'
											}`}
										>
											{showCorrectness && isCorrectAnswer ? (
												<CheckCircle className='w-4 h-4' />
											) : showCorrectness && isSelected && !isCorrectAnswer ? (
												<XCircle className='w-4 h-4' />
											) : (
												choiceLetter
											)}
										</div>
										<span className='flex-1'>{choice.substring(3)}</span>
									</div>
								</button>
							)
						})}
					</CardContent>
				</Card>

				{/* Result Card */}
				{showResult && (
					<Card className='mb-6'>
						<CardHeader>
							<CardTitle
								className={`flex items-center gap-2 ${
									isCorrect ? 'text-green-600' : 'text-red-600'
								}`}
							>
								{isCorrect ? (
									<CheckCircle className='w-5 h-5' />
								) : (
									<XCircle className='w-5 h-5' />
								)}
								{isCorrect ? 'Correct!' : 'Incorrect'}
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className='space-y-3'>
								{!isCorrect && (
									<p className='text-sm text-muted-foreground'>
										<strong>Correct answer:</strong> {currentQuestion.answerKey}
										.{' '}
										{currentQuestion.choices
											.find(c => c.startsWith(currentQuestion.answerKey))
											?.substring(3)}
									</p>
								)}
								<div className='p-3 bg-muted rounded-lg'>
									<p className='text-sm text-foreground'>
										<strong>Explanation:</strong> {currentQuestion.explanation}
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				)}

				{/* Action Buttons */}
				<div className='flex gap-4 justify-center'>
					{!showResult ? (
						<Button
							size='lg'
							onClick={handleSubmitAnswer}
							disabled={!selectedAnswer}
							className='px-8 py-6 text-lg'
						>
							Submit Answer
						</Button>
					) : (
						<Button
							size='lg'
							onClick={handleContinue}
							disabled={loadingMore}
							className='px-8 py-6 text-lg gap-2'
						>
							{loadingMore ? (
								<>
									<div className='animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full'></div>
									Loading...
								</>
							) : currentQuestionIndex >= questions.length - 1 ? (
								'Continue (Load More)'
							) : (
								<>
									Next Question
									<ArrowRight className='w-5 h-5' />
								</>
							)}
						</Button>
					)}
				</div>

				{/* Quiz Stats */}
				<div className='mt-8 text-center'>
					<div className='inline-flex items-center gap-6 px-6 py-3 bg-muted rounded-lg'>
						<div className='text-center'>
							<div className='text-2xl font-bold text-primary'>
								{score.correct}
							</div>
							<div className='text-xs text-muted-foreground'>Correct</div>
						</div>
						<div className='text-center'>
							<div className='text-2xl font-bold text-foreground'>
								{score.total}
							</div>
							<div className='text-xs text-muted-foreground'>Total</div>
						</div>
						<div className='text-center'>
							<div className='text-2xl font-bold text-accent'>
								{score.total > 0
									? Math.round((score.correct / score.total) * 100)
									: 0}
								%
							</div>
							<div className='text-xs text-muted-foreground'>Accuracy</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
