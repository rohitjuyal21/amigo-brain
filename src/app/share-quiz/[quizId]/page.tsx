"use client";
import ShareQuiz from "@/components/ShareQuiz";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = ({ params }: { params: { quizId: string } }) => {
  const createdQuiz = getCookie("createdQuiz");
  const router = useRouter();

  useEffect(() => {
    if (createdQuiz !== params.quizId) {
      return router.push("/amigo-brain");
    }
  }, [createdQuiz, params.quizId, router]);

  return <ShareQuiz quizId={params.quizId} />;
};

export default Page;
