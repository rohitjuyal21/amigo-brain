"use client";
import Loading from "@/components/Loading";
import QuestionWrapper from "@/components/QuestionWrapper";
import { Question } from "@/types/question";
import { useEffect, useState } from "react";

const Page = () => {
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const question = questions?.[currentQuestion];

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("/questions.json");
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div className="px-8 flex-1 flex flex-col items-center justify-center">
      {!questions ? (
        <Loading />
      ) : (
        <>
          <h1 className="text-2xl font-bold text-center mb-8">
            Hi John, Select questions for your quiz
          </h1>
          <QuestionWrapper
            question={question}
            currentQuestion={currentQuestion}
          />
        </>
      )}
    </div>
  );
};

export default Page;
