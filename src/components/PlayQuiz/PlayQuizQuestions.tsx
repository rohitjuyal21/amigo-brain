import { Question } from "@/types/question";
import React, { FC } from "react";
import FlipAnimation from "../FlipAnimation";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

interface IQuestionWrapper {
  question: Question | undefined;
  currentQuestion: number;
  selectedAnswer: string | undefined;
  onOptionSelect: (option: string) => void;
  isAnswered: boolean;
  setIsAnswered: React.Dispatch<React.SetStateAction<boolean>>;
}

const PlayQuizQuestions: FC<IQuestionWrapper> = ({
  question,
  currentQuestion,
  onOptionSelect,
  selectedAnswer,
  isAnswered,
  setIsAnswered,
}) => {
  const handleOptionSelect = (option: string) => {
    setIsAnswered(true);
    onOptionSelect(option);
  };

  return (
    <div className="max-w-3xl w-full space-y-6 sm:space-y-8 bg-muted/50 p-6 sm:p-8 rounded-xl">
      <FlipAnimation key={currentQuestion}>
        <h4 className="text-2xl font-bold text-center">
          Question {currentQuestion + 1}/10
        </h4>
      </FlipAnimation>
      <div className="flex flex-col justify-start gap-4">
        <FlipAnimation key={currentQuestion}>
          <div className="text-lg font-medium py-3 px-4 rounded-md border-input border text-center w-full">
            {question?.question}
          </div>
        </FlipAnimation>
        <ul>
          <RadioGroup
            value={selectedAnswer}
            onValueChange={(value) => handleOptionSelect(value)}
            disabled={isAnswered}
          >
            {question?.options.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === question?.answer;
              const isWrong = isSelected && !isCorrect;

              return (
                <li key={index} className="flex items-center gap-3 mb-2">
                  <RadioGroupItem value={option} id={option} />
                  <FlipAnimation key={currentQuestion}>
                    <div
                      className={`relative overflow-hidden w-full px-4 py-2 border-input font-medium border text-lg rounded-md z-10 
                      `}
                    >
                      <div
                        className={`before:inset-0 before:absolute before:rounded-s-md before:transition-transform before:duration-500 before:-z-10 after:inset-0 after:absolute after:rounded-e-md after:transition-transform after:duration-500 after:-z-10
                        ${
                          isAnswered && isCorrect
                            ? "before:bg-green-400 before:translate-x-0 after:bg-green-400 after:translate-x-0"
                            : "before:-translate-x-full after:translate-x-full"
                        }
                       `}
                      ></div>
                      <div
                        className={`before:inset-0 before:absolute before:rounded-s-md before:transition-transform before:duration-500 before:-z-10 after:inset-0 after:absolute after:rounded-e-md after:transition-transform after:duration-500 after:-z-10
                       
                        ${
                          isAnswered && isWrong
                            ? "before:bg-red-500 before:translate-x-0 after:bg-red-500 after:translate-x-0"
                            : "before:-translate-x-full after:translate-x-full"
                        }`}
                      ></div>
                      <span>{option}</span>
                    </div>
                  </FlipAnimation>
                </li>
              );
            })}
          </RadioGroup>
        </ul>
      </div>
    </div>
  );
};

export default PlayQuizQuestions;
