import dbConnect from "@/lib/dbConnect";
import { Quiz } from "@/models/Quiz";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { quizId: string } }
) {
  const { quizId } = params;
  const cookieStore = cookies().get(`quiz_${quizId}_result`);
  const playerData = cookieStore ? JSON.parse(cookieStore.value) : null;

  if (!playerData || !playerData.playerId) {
    return Response.json("Player ID not found in cookies", { status: 400 });
  }

  const playerId = playerData.playerId;

  try {
    await dbConnect();

    const quiz = await Quiz.findOne({ quizId });
    if (!quiz) {
      return Response.json("Quiz not found", { status: 404 });
    }

    const playerScore = quiz.scores.find(
      (score: { _id: { toString: () => string } }) =>
        score._id.toString() === playerId
    );

    if (!playerScore) {
      return Response.json("Player not found in this quiz", { status: 404 });
    }

    return Response.json(playerScore);
  } catch (error) {
    return Response.json(`Internal Server Error ${error}`, { status: 500 });
  }
}
