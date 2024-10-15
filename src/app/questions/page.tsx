"use client";
import Loading from "@/components/Loading";
import QuestionWrapper from "@/components/QuestionWrapper";
import { Question } from "@/types/question";
import { useEffect, useState } from "react";

const Page = () => {
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [question, setQuestion] = useState<Question>();
  const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>(
    undefined
  );
  const [updatedQuestions, setUpdatedQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("/questions.json");
        const data = await response.json();
        setQuestions(data);
        setQuestion(data[currentQuestion]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchQuestions();
  }, [currentQuestion]);

  useEffect(() => {
    if (questions) {
      setQuestion(questions[currentQuestion]);
    }
  }, [currentQuestion, questions]);

  const handleInputChange = (field: string, value: string, index?: number) => {
    if (!question) return;

    if (field === "question") {
      setQuestion({ ...question, question: value });
    } else if (field === "option" && typeof index === "number") {
      const updatedOptions = [...question.options];
      updatedOptions[index] = value;
      setQuestion({ ...question, options: updatedOptions });
    }
  };

  const handleOptionSelect = (option: string) => {
    setSelectedAnswer(option);
    if (question) {
      setQuestion({ ...question, answer: option });
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
    setUpdatedQuestions([...updatedQuestions, question!]);
  };

  console.log(updatedQuestions);

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
            onInputChange={handleInputChange}
            selectedAnswer={selectedAnswer}
            onOptionSelect={handleOptionSelect}
            onNextQuestion={handleNextQuestion}
          />
        </>
      )}
    </div>
  );
};

export default Page;
