import dbConnect from "@/lib/dbConnect";
import { Quiz } from "@/models/Quiz";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { quizId: string } }
) {
  const quizId = params.quizId;

  try {
    await dbConnect();
    if (!quizId) {
      return Response.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const quiz = await Quiz.findOne({ quizId });

    if (!quiz) {
      return Response.json({ message: "Quiz not found" }, { status: 404 });
    }

    return Response.json({ result: quiz.scores }, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}
