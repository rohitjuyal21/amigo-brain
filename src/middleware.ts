import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const cookieStore = cookies().get("createdQuiz")?.value;

  if (cookieStore) {
    return NextResponse.redirect(
      new URL(`/share-quiz/${cookieStore}`, req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/questions", "/amigo-brain"],
};
