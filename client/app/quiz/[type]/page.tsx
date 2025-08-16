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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { ArrowLeft, BookOpen, Brain, MessageSquare, Play } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { use, useEffect, useState } from 'react'

interface Topic {
	name: string
	questionCount: number
}

export default function QuizSelectionPage({
	params,
}: {
	params: Promise<{ type: string }>
}) {
	const { type } = use(params) // ✅ endi to‘g‘ri
	const router = useRouter()
	const [selectedLevel, setSelectedLevel] = useState<string>('')
	const [selectedTopic, setSelectedTopic] = useState<string>('')
	const [customTopic, setCustomTopic] = useState<string>('')
	const [topics, setTopics] = useState<Topic[]>([])
	const [loading, setLoading] = useState(true)

	const quizTypeConfig = {
		vocabulary: {
			title: 'Vocabulary Quiz',
			description: 'Test your Korean vocabulary knowledge',
			icon: BookOpen,
			color: 'bg-primary',
		},
		grammar: {
			title: 'Grammar Test',
			description: 'Master Korean grammar patterns',
			icon: Brain,
			color: 'bg-secondary',
		},
		sentence: {
			title: 'Sentence Practice',
			description: 'Practice reading comprehension',
			icon: MessageSquare,
			color: 'bg-accent',
		},
	}

	const config = quizTypeConfig[type as keyof typeof quizTypeConfig]
	const IconComponent = config?.icon || BookOpen

	const levels = ['TOPIK1', 'TOPIK2', 'TOPIK3', 'TOPIK4', 'TOPIK5', 'TOPIK6']

	useEffect(() => {
		const fetchTopics = async () => {
			setLoading(true)
			try {
				const response = await fetch(
					`http://localhost:4000/api/quiz-topics?type=${type}`
				)

				if (!response.ok) {
					throw new Error('Failed to fetch topics')
				}
				const data = await response.json()
				setTopics(data.topics || [])
			} catch (error) {
				console.error('Failed to fetch topics:', error)
				setTopics([]) // Set empty array if API call fails
			} finally {
				setLoading(false)
			}
		}

		fetchTopics()
	}, [type])

	const handleStartQuiz = () => {
		if (!selectedLevel) {
			alert('Please select a TOPIK level')
			return
		}

		if (!selectedTopic && !customTopic) {
			alert('Please select a topic or enter a custom topic')
			return
		}

		const topic = selectedTopic === 'custom' ? customTopic : selectedTopic
		const queryParams = new URLSearchParams({
			level: selectedLevel,
			topic: topic,
		})

		router.push(`/quiz/${type}/start?${queryParams}`)
	}

	if (!config) {
		return (
			<div className='min-h-screen bg-background flex items-center justify-center'>
				<Card className='max-w-md'>
					<CardHeader>
						<CardTitle>Quiz Not Found</CardTitle>
						<CardDescription>
							The requested quiz type does not exist.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Link href='/'>
							<Button className='w-full'>Return Home</Button>
						</Link>
					</CardContent>
				</Card>
			</div>
		)
	}

	return (
		<div className='min-h-screen bg-background'>
			{/* Header */}
			<header className='border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50'>
				<div className='container mx-auto px-4 py-4'>
					<div className='flex items-center gap-4'>
						<Link href='/'>
							<Button variant='ghost' size='sm' className='gap-2'>
								<ArrowLeft className='w-4 h-4' />
								Back
							</Button>
						</Link>
						<div className='flex items-center gap-2'>
							<div className='w-8 h-8 bg-primary rounded-lg flex items-center justify-center'>
								<BookOpen className='w-5 h-5 text-primary-foreground' />
							</div>
							<h1 className='text-xl font-bold text-foreground'>
								TOPIK Study Hub
							</h1>
						</div>
					</div>
				</div>
			</header>

			<div className='container mx-auto px-4 py-8 max-w-4xl'>
				{/* Quiz Type Header */}
				<div className='text-center mb-8'>
					<div
						className={`w-16 h-16 ${config.color} rounded-full flex items-center justify-center mx-auto mb-4`}
					>
						<IconComponent className='w-8 h-8 text-white' />
					</div>
					<h2 className='text-3xl font-bold text-foreground mb-2 font-[var(--font-playfair)]'>
						{config.title}
					</h2>
					<p className='text-lg text-muted-foreground'>{config.description}</p>
				</div>

				<div className='grid lg:grid-cols-2 gap-8'>
					{/* Level Selection */}
					<Card>
						<CardHeader>
							<CardTitle className='flex items-center gap-2'>
								<Badge
									variant='outline'
									className='w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs'
								>
									1
								</Badge>
								Select Your Level
							</CardTitle>
							<CardDescription>
								Choose your current TOPIK proficiency level
							</CardDescription>
						</CardHeader>
						<CardContent className='space-y-4'>
							<div className='grid grid-cols-2 gap-3'>
								{levels.map(level => (
									<Button
										key={level}
										variant={selectedLevel === level ? 'default' : 'outline'}
										className='h-12 text-sm font-medium'
										onClick={() => setSelectedLevel(level)}
									>
										{level}
									</Button>
								))}
							</div>
							{selectedLevel && (
								<div className='p-3 bg-muted rounded-lg'>
									<p className='text-sm text-muted-foreground'>
										<strong>{selectedLevel}</strong> -{' '}
										{selectedLevel.includes('1') || selectedLevel.includes('2')
											? 'Beginner level Korean proficiency'
											: selectedLevel.includes('3') ||
											  selectedLevel.includes('4')
											? 'Intermediate level Korean proficiency'
											: 'Advanced level Korean proficiency'}
									</p>
								</div>
							)}
						</CardContent>
					</Card>

					{/* Topic Selection */}
					<Card>
						<CardHeader>
							<CardTitle className='flex items-center gap-2'>
								<Badge
									variant='outline'
									className='w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs'
								>
									2
								</Badge>
								Choose Topic
							</CardTitle>
							<CardDescription>
								Select a topic or create a custom one
							</CardDescription>
						</CardHeader>
						<CardContent className='space-y-4 h-full'>
							<Select value={selectedTopic} onValueChange={setSelectedTopic}>
								<SelectTrigger className='w-full h-12 px-3 border border-border rounded-md bg-background text-foreground'>
									<SelectValue placeholder='Select a topic...' />
								</SelectTrigger>
								<SelectContent>
									{loading ? (
										<SelectItem value='loading' disabled>
											Loading topics...
										</SelectItem>
									) : (
										<>
											{topics.length > 0 &&
												topics.map(topic => (
													<SelectItem key={topic.name} value={topic.name}>
														<div className='flex items-center justify-between w-full'>
															<span>{topic.name}</span>
															<Badge
																variant='secondary'
																className='ml-2 text-xs'
															>
																{topic.questionCount} questions
															</Badge>
														</div>
													</SelectItem>
												))}
											<SelectItem value='custom'>Custom Topic</SelectItem>
											{topics.length === 0 && !loading && (
												<SelectItem value='no-topics' disabled>
													No topics available - use custom topic
												</SelectItem>
											)}
										</>
									)}
								</SelectContent>
							</Select>

							{selectedTopic === 'custom' && (
								<div className='space-y-2'>
									<input
										type='text'
										placeholder='Enter your custom topic...'
										value={customTopic}
										onChange={e => setCustomTopic(e.target.value)}
										className='w-full h-12 px-3 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring'
									/>
									<p className='text-xs text-muted-foreground'>
										Enter any topic you`d like to practice. Questions will be
										generated based on your input.
									</p>
								</div>
							)}

							{selectedTopic && selectedTopic !== 'custom' && (
								<div className='p-3 bg-muted rounded-lg'>
									<p className='text-sm text-muted-foreground'>
										<strong>
											{topics.find(t => t.name === selectedTopic)?.name}
										</strong>{' '}
										-{topics.find(t => t.name === selectedTopic)?.questionCount}{' '}
										questions available
									</p>
								</div>
							)}
						</CardContent>
					</Card>
				</div>

				{/* Start Quiz Button */}
				<div className='mt-8 text-center'>
					<Button
						size='lg'
						className='px-8 py-6 text-lg gap-2'
						onClick={handleStartQuiz}
						disabled={!selectedLevel || (!selectedTopic && !customTopic)}
					>
						<Play className='w-5 h-5' />
						Start {config.title}
					</Button>
					<p className='text-sm text-muted-foreground mt-2'>
						Questions will be loaded dynamically based on your selections
					</p>
				</div>
			</div>
		</div>
	)
}
