import dbConnect from "@/lib/dbConnect";
import { User } from "@/models/User";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { name } = await req.json();
    console.log(name);
    const newUser = await User.create({
      name,
    });

    await newUser.save();

    return Response.json(name, { status: 201 });
  } catch (error) {
    return Response.json(
      { message: `Error while creating user ${error}` },
      { status: 500 }
    );
  }
}
