import dbConnect from "@/lib/dbConnect";
import { User } from "@/models/User";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { name } = await req.json();
    const newUser = await User.create({
      name,
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    cookies().set("quizCreator", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 86400,
    });

    return Response.json(name, { status: 201 });
  } catch (error) {
    return Response.json(
      { message: `Error while creating user ${error}` },
      { status: 500 }
    );
  }
}
