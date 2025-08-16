import { type NextRequest, NextResponse } from "next/server"
import { getTopicsByType } from "@/lib/mock-data"

interface Topic {
  id: string
  name: string
  questionCount: number
  levels: string[]
  description?: string
}

// Mock topics database - will be replaced with actual database integration
const mockTopics: Topic[] = [
  {
    id: "family",
    name: "Family & Relationships",
    questionCount: 45,
    levels: ["TOPIK1", "TOPIK2", "TOPIK3", "TOPIK4", "TOPIK5"],
    description: "Family members, relationships, and social connections",
  },
  {
    id: "food",
    name: "Food & Dining",
    questionCount: 38,
    levels: ["TOPIK1", "TOPIK2", "TOPIK3"],
    description: "Korean cuisine, dining etiquette, and food-related vocabulary",
  },
  {
    id: "work",
    name: "Work & Career",
    questionCount: 52,
    levels: ["TOPIK3", "TOPIK4", "TOPIK5", "TOPIK6"],
    description: "Professional life, job interviews, and workplace communication",
  },
  {
    id: "travel",
    name: "Travel & Transportation",
    questionCount: 41,
    levels: ["TOPIK2", "TOPIK3", "TOPIK4"],
    description: "Transportation, directions, and travel-related situations",
  },
  {
    id: "health",
    name: "Health & Body",
    questionCount: 33,
    levels: ["TOPIK1", "TOPIK2", "TOPIK3", "TOPIK4"],
    description: "Health, medical situations, and body parts",
  },
  {
    id: "education",
    name: "Education & Learning",
    questionCount: 47,
    levels: ["TOPIK2", "TOPIK3", "TOPIK4", "TOPIK5", "TOPIK6"],
    description: "School, university, and educational experiences",
  },
  {
    id: "weather",
    name: "Weather & Seasons",
    questionCount: 29,
    levels: ["TOPIK1", "TOPIK2"],
    description: "Weather conditions, seasons, and climate",
  },
  {
    id: "shopping",
    name: "Shopping & Money",
    questionCount: 36,
    levels: ["TOPIK1", "TOPIK2", "TOPIK3"],
    description: "Shopping, prices, and financial transactions",
  },
  {
    id: "grammar-patterns",
    name: "Grammar Patterns",
    questionCount: 64,
    levels: ["TOPIK1", "TOPIK2", "TOPIK3", "TOPIK4", "TOPIK5", "TOPIK6"],
    description: "Essential Korean grammar patterns and structures",
  },
  {
    id: "connectors",
    name: "Connectors & Conjunctions",
    questionCount: 28,
    levels: ["TOPIK2", "TOPIK3", "TOPIK4"],
    description: "Connecting words and sentence conjunctions",
  },
  {
    id: "time-expressions",
    name: "Time Expressions",
    questionCount: 35,
    levels: ["TOPIK1", "TOPIK2", "TOPIK3", "TOPIK4"],
    description: "Time-related vocabulary and expressions",
  },
  {
    id: "advanced-grammar",
    name: "Advanced Grammar",
    questionCount: 42,
    levels: ["TOPIK5", "TOPIK6"],
    description: "Complex grammar structures for advanced learners",
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Extract query parameters
    const type = searchParams.get("type") || ""
    const level = searchParams.get("level") || ""
    const search = searchParams.get("search") || ""

    const topicsData = getTopicsByType(type, level)

    // Convert to the expected format and add additional metadata
    let filteredTopics: Topic[] = topicsData.map((topic) => ({
      id: topic.name.toLowerCase().replace(/[^a-z0-9]/g, "-"),
      name: topic.name,
      questionCount: topic.count,
      levels: level ? [level] : ["TOPIK1", "TOPIK2", "TOPIK3", "TOPIK4", "TOPIK5", "TOPIK6"],
      description: topic.description,
    }))

    // Filter by search term
    if (search) {
      const searchLower = search.toLowerCase()
      filteredTopics = filteredTopics.filter(
        (topic) =>
          topic.name.toLowerCase().includes(searchLower) || topic.description?.toLowerCase().includes(searchLower),
      )
    }

    // Sort topics by question count (descending) and then by name
    filteredTopics.sort((a, b) => {
      if (b.questionCount !== a.questionCount) {
        return b.questionCount - a.questionCount
      }
      return a.name.localeCompare(b.name)
    })

    // Simulate database delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    return NextResponse.json({
      success: true,
      data: {
        topics: filteredTopics,
        totalTopics: filteredTopics.length,
        filters: {
          type,
          level,
          search,
        },
      },
    })
  } catch (error) {
    console.error("Error fetching topics:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch topics",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, levels, type } = body

    // This would typically create a new custom topic in the database
    // For now, return a mock response
    const newTopic: Topic = {
      id: `custom_${Date.now()}`,
      name,
      questionCount: 0, // Will be populated as questions are generated
      levels: levels || ["TOPIK1", "TOPIK2", "TOPIK3", "TOPIK4", "TOPIK5", "TOPIK6"],
      description: description || `Custom topic: ${name}`,
    }

    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json({
      success: true,
      data: {
        topic: newTopic,
        message: "Custom topic created successfully",
      },
    })
  } catch (error) {
    console.error("Error creating topic:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create topic",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
