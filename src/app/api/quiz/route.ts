import dbConnect from "@/lib/dbConnect";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import { Quiz } from "@/models/Quiz";

interface JwtPayload {
  userId: string;
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const cookieStore = cookies();
    const token = cookieStore.get("quizCreator");

    console.log(token);

    if (!token) {
      return Response.json(
        { message: "User not authenticated to create a quiz." },
        { status: 401 }
      );
    }

    let decodeToken;

    try {
      decodeToken = jwt.verify(
        token.value,
        process.env.JWT_SECRET!
      ) as JwtPayload;
    } catch (error) {
      return Response.json(
        { message: "Invalid token", error },
        { status: 403 }
      );
    }

    const { userId } = decodeToken;
    console.log(userId);

    const { questions } = await req.json();

    const quizId = nanoid(6);

    const newQuiz = new Quiz({
      creator: userId,
      questions,
      quizId,
    });

    await newQuiz.save();

    return Response.json({ quizId: newQuiz.quizId }, { status: 201 });
  } catch (error) {
    return Response.json(
      { message: `Error while creating quiz: ${error}` },
      { status: 500 }
    );
  }
}
