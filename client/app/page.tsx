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
	BookOpen,
	Brain,
	MessageSquare,
	Trophy,
	Users,
	Zap,
} from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
	const quizTypes = [
		{
			id: 'vocabulary',
			title: 'Vocabulary Quiz',
			description:
				'Test your Korean vocabulary knowledge with interactive flashcards and multiple choice questions',
			icon: BookOpen,
			color: 'bg-primary',
			levels: ['TOPIK1', 'TOPIK2', 'TOPIK3', 'TOPIK4', 'TOPIK5', 'TOPIK6'],
		},
		{
			id: 'grammar',
			title: 'Grammar Test',
			description:
				'Master Korean grammar patterns and sentence structures through targeted exercises',
			icon: Brain,
			color: 'bg-secondary',
			levels: ['TOPIK1', 'TOPIK2', 'TOPIK3', 'TOPIK4', 'TOPIK5', 'TOPIK6'],
		},
		{
			id: 'sentence',
			title: 'Sentence Practice',
			description:
				'Practice reading comprehension and sentence completion with real TOPIK-style questions',
			icon: MessageSquare,
			color: 'bg-accent',
			levels: ['TOPIK1', 'TOPIK2', 'TOPIK3', 'TOPIK4', 'TOPIK5', 'TOPIK6'],
		},
	]

	const features = [
		{
			icon: Trophy,
			title: 'TOPIK-Focused',
			description:
				'All content aligned with official TOPIK exam standards and formats',
		},
		{
			icon: Zap,
			title: 'Adaptive Learning',
			description:
				'Questions adapt to your level with unlimited practice sessions',
		},
		{
			icon: Users,
			title: 'All Levels',
			description:
				'From beginner TOPIK1 to advanced TOPIK6 comprehensive coverage',
		},
	]

	return (
		<div className='min-h-screen bg-background'>
			{/* Header */}
			<header className='border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50'>
				<div className='container mx-auto px-4 py-4'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-2'>
							<div className='w-8 h-8 bg-primary rounded-lg flex items-center justify-center'>
								<BookOpen className='w-5 h-5 text-primary-foreground' />
							</div>
							<h1 className='text-xl font-bold text-foreground'>
								TOPIK Study Hub
							</h1>
						</div>
						<nav className='hidden md:flex items-center gap-6'>
							<Link
								href='#quizzes'
								className='text-muted-foreground hover:text-foreground transition-colors'
							>
								Quizzes
							</Link>
							<Link
								href='#features'
								className='text-muted-foreground hover:text-foreground transition-colors'
							>
								Features
							</Link>
							<Button variant='outline' size='sm'>
								Sign In
							</Button>
						</nav>
					</div>
				</div>
			</header>

			{/* Hero Section */}
			<section className='py-20 px-4'>
				<div className='container mx-auto text-center max-w-4xl'>
					<h2 className='text-4xl md:text-6xl font-bold text-foreground mb-6 font-[var(--font-playfair)]'>
						Master Korean with
						<span className='text-primary block'>TOPIK Study Hub</span>
					</h2>
					<p className='text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed'>
						Comprehensive study platform designed specifically for TOPIK
						success. Practice vocabulary, grammar, and reading comprehension
						with adaptive quizzes tailored to your level.
					</p>
					<div className='flex flex-col sm:flex-row gap-4 justify-center'>
						<Button size='lg' className='text-lg px-8 py-6'>
							Start Learning Now
						</Button>
						<Button
							variant='outline'
							size='lg'
							className='text-lg px-8 py-6 bg-transparent'
						>
							View Sample Questions
						</Button>
					</div>
				</div>
			</section>

			{/* Quiz Types Section */}
			<section id='quizzes' className='py-16 px-4 bg-muted/30'>
				<div className='container mx-auto max-w-6xl'>
					<div className='text-center mb-12'>
						<h3 className='text-3xl font-bold text-foreground mb-4 font-[var(--font-playfair)]'>
							Choose Your Study Path
						</h3>
						<p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
							Select from our comprehensive quiz types, each designed to target
							specific TOPIK skills and knowledge areas.
						</p>
					</div>

					<div className='grid md:grid-cols-3 gap-6'>
						{quizTypes.map(quiz => {
							const IconComponent = quiz.icon
							return (
								<Card
									key={quiz.id}
									className='group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20'
								>
									<CardHeader className='pb-4'>
										<div
											className={`w-12 h-12 ${quiz.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
										>
											<IconComponent className='w-6 h-6 text-white' />
										</div>
										<CardTitle className='text-xl font-semibold text-card-foreground'>
											{quiz.title}
										</CardTitle>
										<CardDescription className='text-muted-foreground leading-relaxed'>
											{quiz.description}
										</CardDescription>
									</CardHeader>
									<CardContent className='pt-0'>
										<div className='flex flex-wrap gap-2 mb-4'>
											{quiz.levels.slice(0, 3).map(level => (
												<Badge
													key={level}
													variant='secondary'
													className='text-xs'
												>
													{level}
												</Badge>
											))}
											{quiz.levels.length > 3 && (
												<Badge variant='outline' className='text-xs'>
													+{quiz.levels.length - 3} more
												</Badge>
											)}
										</div>
										<Link href={`/quiz/${quiz.id}`}>
											<Button className='w-full group-hover:bg-primary/90 transition-colors'>
												Start {quiz.title}
											</Button>
										</Link>
									</CardContent>
								</Card>
							)
						})}
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section id='features' className='py-16 px-4'>
				<div className='container mx-auto max-w-6xl'>
					<div className='text-center mb-12'>
						<h3 className='text-3xl font-bold text-foreground mb-4 font-[var(--font-playfair)]'>
							Why Choose TOPIK Study Hub?
						</h3>
						<p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
							Built specifically for Korean language learners preparing for the
							TOPIK exam with modern learning techniques.
						</p>
					</div>

					<div className='grid md:grid-cols-3 gap-8'>
						{features.map((feature, index) => {
							const IconComponent = feature.icon
							return (
								<div key={index} className='text-center'>
									<div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4'>
										<IconComponent className='w-8 h-8 text-primary' />
									</div>
									<h4 className='text-xl font-semibold text-foreground mb-2'>
										{feature.title}
									</h4>
									<p className='text-muted-foreground leading-relaxed'>
										{feature.description}
									</p>
								</div>
							)
						})}
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className='border-t border-border bg-card/30 py-8 px-4'>
				<div className='container mx-auto text-center'>
					<div className='flex items-center justify-center gap-2 mb-4'>
						<div className='w-6 h-6 bg-primary rounded flex items-center justify-center'>
							<BookOpen className='w-4 h-4 text-primary-foreground' />
						</div>
						<span className='font-semibold text-foreground'>
							TOPIK Study Hub
						</span>
					</div>
					<p className='text-muted-foreground text-sm'>
						Empowering Korean language learners worldwide. Built with ❤️ for
						TOPIK success.
					</p>
				</div>
			</footer>
		</div>
	)
}
