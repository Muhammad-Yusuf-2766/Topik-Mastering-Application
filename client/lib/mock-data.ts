export interface TOPIKQuestion {
  _id: string
  type: "vocab" | "sentence" | "grammar"
  level: "TOPIK1" | "TOPIK2" | "TOPIK3" | "TOPIK4" | "TOPIK5" | "TOPIK6"
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

export const mockQuestions: TOPIKQuestion[] = [
  {
    _id: "689f187a23c82dafdef46d9a",
    type: "sentence",
    level: "TOPIK2",
    topic: "-겠-",
    prompt: "혼자서는 그 일을 다 못 ______. (Alone, I won't be able to do all that work.)",
    choices: ["A. 하겠어요", "B. 할 거예요", "C. 하네요", "D. 하세요"],
    answerKey: "A",
    explanation:
      "어떤 일이 불가능하거나 어렵다는 것을 나타낼 때 '-겠-'을 사용하여 화자의 판단이나 상황을 표현할 수 있습니다. 주로 부정문과 함께 쓰입니다.",
    source: "ai",
    review: true,
    hash: "ac73200b7ac7a0c5d10a28aa846e593994b9d23a075708116dafec45d2246e44",
    createdAt: "2025-08-15T11:22:34.796Z",
    updatedAt: "2025-08-15T11:22:34.796Z",
  },
  {
    _id: "689f1b0d1b9aefc22f45c3f4",
    type: "vocab",
    level: "TOPIK5",
    topic: "family",
    prompt: "남편의 어머니를 뜻하는 가족 호칭은 무엇입니까?",
    choices: ["A. 시어머니", "B. 친정어머니", "C. 장모님", "D. 고모"],
    answerKey: "A",
    explanation: "'시어머니'는 남편의 어머니를 지칭하는 말입니다.",
    source: "ai",
    review: true,
    hash: "465e072c1c1ab8cc2019272c384981a2e7a1cb7b927cd3f7c044cb1f218707d3",
    createdAt: "2025-08-15T11:33:33.456Z",
    updatedAt: "2025-08-15T11:33:33.456Z",
  },
  {
    _id: "689f1c2e3d8bfac33g56d4e5",
    type: "grammar",
    level: "TOPIK3",
    topic: "-(으)ㄹ 것 같다",
    prompt: "내일 비가 ______ 것 같아요. (It seems like it will rain tomorrow.)",
    choices: ["A. 올", "B. 오는", "C. 온", "D. 와"],
    answerKey: "A",
    explanation: "'-(으)ㄹ 것 같다'는 추측을 나타내는 표현으로, 동사 어간에 '-(으)ㄹ'을 붙여 사용합니다.",
    source: "ai",
    review: true,
    hash: "576e183d2c2bc6d4e21a39bb957f8c8c186819c2b86819d227eaf56e3357f55",
    createdAt: "2025-08-15T11:45:22.123Z",
    updatedAt: "2025-08-15T11:45:22.123Z",
  },
  {
    _id: "689f1d3f4e9cgbd44h67e5f6",
    type: "vocab",
    level: "TOPIK1",
    topic: "food",
    prompt: "한국의 전통 음식 중 하나로, 배추와 고춧가루로 만드는 것은?",
    choices: ["A. 불고기", "B. 김치", "C. 비빔밥", "D. 냉면"],
    answerKey: "B",
    explanation:
      "김치는 배추, 무 등의 채소를 고춧가루, 마늘, 생강 등의 양념으로 절여 발효시킨 한국의 대표적인 전통 음식입니다.",
    source: "ai",
    review: true,
    hash: "687f294e3d3cd7e5f32b4acc068g9d9d297930d3c97930e338fbg67f4468g66",
    createdAt: "2025-08-15T11:56:11.789Z",
    updatedAt: "2025-08-15T11:56:11.789Z",
  },
  {
    _id: "689f1e4g5f0dhce55i78f6g7",
    type: "sentence",
    level: "TOPIK4",
    topic: "-기 때문에",
    prompt: "시험이 어려웠기 ______ 많은 학생들이 떨어졌다. (Because the exam was difficult, many students failed.)",
    choices: ["A. 때문에", "B. 때문이", "C. 때문을", "D. 때문으로"],
    answerKey: "A",
    explanation: "'-기 때문에'는 이유나 원인을 나타내는 연결어미입니다. '때문에' 앞에는 관형형 '-기'가 옵니다.",
    source: "ai",
    review: true,
    hash: "798g305f4e4de8f6g43c5bdd179h0e0e308041e4d08041f449gch78g5579h77",
    createdAt: "2025-08-15T12:07:45.456Z",
    updatedAt: "2025-08-15T12:07:45.456Z",
  },
  {
    _id: "689f1f5h6g1eide66j89g7h8",
    type: "grammar",
    level: "TOPIK6",
    topic: "-(으)ㄴ/는 바에야",
    prompt:
      "이렇게 힘들게 공부하는 ______ 포기하는 게 낫겠다. (If I'm going to study this hard, it would be better to give up.)",
    choices: ["A. 바에야", "B. 바에서", "C. 바로", "D. 바에"],
    answerKey: "A",
    explanation: "'-(으)ㄴ/는 바에야'는 어떤 상황이라면 차라리 다른 선택이 낫다는 의미를 나타내는 고급 문법입니다.",
    source: "ai",
    review: true,
    hash: "809h416g5f5ef9g7h54d6cee280i1f1f419152f5e19152g550hdi89h6680i88",
    createdAt: "2025-08-15T12:18:33.234Z",
    updatedAt: "2025-08-15T12:18:33.234Z",
  },
]

export const getQuestionsByFilters = (type?: string, level?: string, topic?: string, page = 1, limit = 10) => {
  let filtered = mockQuestions

  if (type) {
    filtered = filtered.filter((q) => q.type === type)
  }

  if (level) {
    filtered = filtered.filter((q) => q.level === level)
  }

  if (topic && topic !== "custom") {
    filtered = filtered.filter((q) => q.topic === topic)
  }

  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit

  return {
    questions: filtered.slice(startIndex, endIndex),
    total: filtered.length,
    hasMore: endIndex < filtered.length,
  }
}

export const getTopicsByType = (type?: string, level?: string) => {
  let filtered = mockQuestions

  if (type) {
    filtered = filtered.filter((q) => q.type === type)
  }

  if (level) {
    filtered = filtered.filter((q) => q.level === level)
  }

  const topicCounts = filtered.reduce(
    (acc, question) => {
      const topic = question.topic
      acc[topic] = (acc[topic] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  return Object.entries(topicCounts).map(([topic, count]) => ({
    name: topic,
    count,
    description: `${count} questions available`,
  }))
}
