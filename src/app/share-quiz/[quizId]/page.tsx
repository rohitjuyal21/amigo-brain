"use client";
import ShareQuiz from "@/components/ShareQuiz";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const page = ({ params }: { params: { quizId: string } }) => {
  const createdQuiz = getCookie("createdQuiz");
  // const createdQuiz = cookieStore?.value;
  const router = useRouter();

  useEffect(() => {
    if (createdQuiz !== params.quizId) {
      return router.push("/amigo-brain");
    }
  }, []);
  return <ShareQuiz quizId={params.quizId} />;
};

export default page;
