import { Question } from "@/types/question";
import React, { FC } from "react";

interface IQuestionWrapper {
  question: Question | undefined;
  currentQuestion: number;
}

const QuestionWrapper: FC<IQuestionWrapper> = ({
  question,
  currentQuestion,
}) => {
  return (
    <div className="max-w-3xl w-full space-y-6 sm:space-y-8 bg-muted/50 p-6 sm:p-8 rounded-xl">
      <h4 className="text-2xl font-bold text-center">
        Question {currentQuestion + 1}/10
      </h4>
      <div className="flex flex-col justify-start">
        <p className="text-lg sm:text-xl font-medium mb-3">
          {question?.question}
        </p>
        <ul>
          {question?.options.map((option, index) => (
            <li key={index} className="text-lg sm:text-xl font-medium mb-3">
              {option}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default QuestionWrapper;
