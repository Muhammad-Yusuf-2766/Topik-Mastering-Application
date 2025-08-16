# 📝 TOPIK Study Hub – Server

A modern backend API for the [TOPIK Study Hub](https://github.com/your-org/topik-study), providing adaptive Korean language quiz generation, question pools, and topic management for all TOPIK levels.

---

## 🚀 Features

- 🔥 **AI-powered question generation** (Google Gemini)
- 📚 **MongoDB-backed question pool** with deduplication
- 🏷️ **Dynamic topic & level support** for vocabulary, grammar, and sentence quizzes
- ⚡ **Fast REST API** built with Express.js
- 🛡️ **TypeScript** for type safety
- 🧪 **Zod** for runtime validation

---

## 🛠️ Tech Stack

- [![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)](https://nodejs.org/) Node.js
- [![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)](https://expressjs.com/) Express
- [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/) TypeScript
- [![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/) MongoDB (via Mongoose)
- [![Zod](https://img.shields.io/badge/Zod-3E7CBA?logo=zod&logoColor=white)](https://zod.dev/) Zod
- [![Google Gemini](https://img.shields.io/badge/Gemini-4285F4?logo=google&logoColor=white)](https://ai.google.dev/gemini-api/docs/quickstart) Google Gemini API

---

## 📦 Setup

1. **Install dependencies:**

   ```sh
   npm install
   ```

2. **Configure environment:**

   - Copy `.env.example` to `.env` and fill in:
     ```
     MONGODB_URI=your_mongodb_uri
     GEMINI_API_KEY=your_gemini_api_key
     ALLOWED_ORIGIN=http://localhost:3000
     ```

3. **Run the server:**

   ```sh
   npm run dev
   ```

   The API will be available at [http://localhost:4000](http://localhost:4000).

---

## 📚 API Endpoints

- `GET /api/quiz` – Get quiz questions (auto-generates if needed)
- `GET /api/quiz-topics` – List available topics with question counts
- `GET /` – Health check

---

## 🤝 Contributing

PRs and issues are welcome! Please open an issue for bugs or feature requests.

---

## License

MIT © 2024 TOPIK Study Hub
