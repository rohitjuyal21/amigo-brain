import Result from "@/components/Result";

import React from "react";

const page = ({ params }: { params: { quizId: string } }) => {
  return <Result quizId={params.quizId} />;
};

export default page;
