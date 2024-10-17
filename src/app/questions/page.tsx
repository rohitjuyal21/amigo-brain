"use client";
import Loading from "@/components/Loading";
import QuestionWrapper from "@/components/QuestionWrapper";
import { useQuiz } from "@/components/QuizContext";
import { Question } from "@/types/question";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [question, setQuestion] = useState<Question>();
  const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>(
    undefined
  );
  const [updatedQuestions, setUpdatedQuestions] = useState<Question[]>([]);
  const { quizCreator } = useQuiz();

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
    if (questions) {
      if (!selectedAnswer) {
        return toast.error("Please select an answer");
      }

      if (currentQuestion >= questions?.length - 1) {
        console.log(updatedQuestions);
      } else {
        setCurrentQuestion(currentQuestion + 1);
      }

      setUpdatedQuestions([...updatedQuestions, question!]);
      setSelectedAnswer(undefined);
    }
  };

  return (
    <div className="px-8 flex-1 flex flex-col items-center justify-center my-4">
      {!questions ? (
        <Loading />
      ) : (
        <>
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-center mb-3">
              Hi {quizCreator}
            </h1>
            <p className="text-lg font-semibold text-center">
              ✍️ You can edit questions and options according to your choice
            </p>
          </div>

          <QuestionWrapper
            questions={questions}
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
