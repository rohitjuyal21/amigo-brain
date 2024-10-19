import { Question } from "@/types/question";
import React, { FC } from "react";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import FlipAnimation from "./FlipAnimation";

interface IQuestionWrapper {
  questions: Question[];
  question: Question | undefined;
  currentQuestion: number;
  onInputChange: (field: string, value: string, index?: number) => void;
  selectedAnswer: string | undefined;
  onOptionSelect: (option: string) => void;
  onNextQuestion: () => void;
}

const QuestionWrapper: FC<IQuestionWrapper> = ({
  questions,
  question,
  currentQuestion,
  onInputChange,
  selectedAnswer,
  onOptionSelect,
  onNextQuestion,
}) => {
  return (
    <div className="max-w-3xl w-full space-y-6 sm:space-y-8 bg-muted/50 p-6 sm:p-8 rounded-xl">
      <FlipAnimation key={currentQuestion}>
        <h4 className="text-2xl font-bold text-center">
          Question {currentQuestion + 1}/10
        </h4>
      </FlipAnimation>
      <div className="flex flex-col justify-start gap-4">
        <FlipAnimation key={currentQuestion}>
          <Input
            value={question?.question || ""}
            onChange={(e) => onInputChange("question", e.target.value)}
            className="text-lg font-medium h-12 px-4 bg-transparent"
          />
        </FlipAnimation>
        <ul>
          <RadioGroup
            value={selectedAnswer}
            onValueChange={(value) => onOptionSelect(value)}
          >
            {question?.options.map((option, index) => (
              <li key={index} className="flex items-center gap-3 mb-2">
                <RadioGroupItem value={option} id={option} />
                <div
                  className={`relative overflow-hidden w-full rounded-md z-10 before:inset-0 before:absolute before:bg-green-400 before:rounded-s-md before:transition before:duration-500 before:-z-10 after:inset-0 after:absolute after:bg-green-400 after:rounded-e-md after:transition after:duration-500 after:-z-10 ${
                    selectedAnswer === option
                      ? "before:translate-x-0 after:translate-x-0"
                      : "before:-translate-x-full after:translate-x-full"
                  } `}
                >
                  <FlipAnimation key={currentQuestion}>
                    <Input
                      value={option || ""}
                      onChange={(e) =>
                        onInputChange("option", e.target.value, index)
                      }
                      className={`text-lg font-medium h-10 px-4 bg-transparent transition duration-300 ${
                        selectedAnswer === option
                          ? "text-white"
                          : "text-primary"
                      }`}
                    />
                  </FlipAnimation>
                </div>
              </li>
            ))}
          </RadioGroup>
        </ul>
        <div className="flex justify-center">
          <Button className="w-full" onClick={onNextQuestion}>
            {currentQuestion >= questions.length - 1 ? (
              "Save and Share"
            ) : (
              <>
                Next Question <ArrowRight className="size-5 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default QuestionWrapper;
