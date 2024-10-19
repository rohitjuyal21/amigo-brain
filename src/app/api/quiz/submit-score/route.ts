import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { quizId, playerName, score } = await req.json();

  if (!quizId || !playerName || !score) {
    return new Response("Missing required fields", { status: 400 });
  }
}
