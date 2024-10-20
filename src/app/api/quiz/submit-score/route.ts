import dbConnect from "@/lib/dbConnect";
import { Quiz } from "@/models/Quiz";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { quizId, playerName, score } = await req.json();

  if (!quizId || !playerName || !score) {
    return new Response("Missing required fields", { status: 400 });
  }

  try {
    await dbConnect();

    const quiz = await Quiz.findOne({ quizId });

    if (!quiz) {
      return new Response("Quiz not found", { status: 404 });
    }

    quiz.scores.push({ playerName, score });
    const updatedQuiz = await quiz.save();

    const newScoreEntry = updatedQuiz.scores[updatedQuiz.scores.length - 1];
    cookies().set({
      name: `quiz_${quizId}_result`,
      value: JSON.stringify({
        playerName,
        score,
        playerId: newScoreEntry._id,
      }),
      httpOnly: true,
      maxAge: 365 * 24 * 60 * 60,
    });

    return Response.json({
      message: "Score submitted successfully",
      playerId: newScoreEntry._id,
    });
  } catch (error) {
    console.error("Error saving score:", error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
