import ShareQuiz from "@/components/ShareQuiz";
import React from "react";

const page = ({ params }: { params: { quizId: string } }) => {
  return <ShareQuiz quizId={params.quizId} />;
};

export default page;
