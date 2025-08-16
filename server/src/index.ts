import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import pino from 'pino'
import { connectDB } from './db'
import quizRoute from './routes/quizRoute'

const log = pino({ name: 'app' })

// .env dan o'qing: ALLOWED_ORIGIN=http://localhost:3000
const allowedOrigin = process.env.ALLOWED_ORIGIN ?? 'http://localhost:3000'

async function main() {
	const app = express()
	app.use(
		cors({
			origin: allowedOrigin,
			methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
			allowedHeaders: ['Content-Type', 'Authorization'],
			credentials: true, // agar cookie/token header bo'lsa
		})
	)
	app.use(express.json())

	await connectDB(process.env.MONGODB_URI!)

	app.use('/api', quizRoute)

	app.get('/', (_, res) => res.send('OK'))

	const port = Number(process.env.PORT || 4000)
	app.listen(port, () => log.info({ port }, 'listening'))
}

main().catch(err => {
	console.error(err)
	process.exit(1)
})
