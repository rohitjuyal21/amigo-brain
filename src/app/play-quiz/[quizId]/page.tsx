import PlayQuiz from "@/components/PlayQuiz/PlayQuiz";
import React from "react";

const page = ({ params }: { params: { quizId: string } }) => {
  return <PlayQuiz quizId={params.quizId} />;
};

export default page;
