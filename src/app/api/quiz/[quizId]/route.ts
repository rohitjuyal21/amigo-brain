import dbConnect from "@/lib/dbConnect";
import { Quiz } from "@/models/Quiz";
import { User } from "@/models/User";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { quizId: string } }
) {
  const quizId = params.quizId;
  try {
    await dbConnect();
    const quiz = await Quiz.findOne({ quizId });
    if (!quiz) {
      return NextResponse.json({ message: "Quiz not found" }, { status: 404 });
    }
    const quizCreator = await User.findById(quiz.creator);
    return NextResponse.json({
      quizCreator,
      questions: quiz.questions,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching quiz", error },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { quizId: string } }
) {
  const quizId = params.quizId;
  try {
    await dbConnect();
    await Quiz.findOneAndDelete({ quizId });
    cookies().delete("createdQuiz");
    return NextResponse.json({ message: "Quiz deleted successfully" });
  } catch (error) {
    console.error("Error deleting quiz", error);
    return NextResponse.json(
      { message: "Error deleting quiz", error },
      { status: 500 }
    );
  }
}
