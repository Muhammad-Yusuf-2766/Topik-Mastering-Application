import { NextResponse } from "next/server"

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      message: "TOPIK Study API is running",
      timestamp: new Date().toISOString(),
      endpoints: {
        questions: "/api/questions",
        topics: "/api/topics",
        health: "/api/health",
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Health check failed",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
