"use client";
import React, { useEffect, useState } from "react";
import PlayQuizInstructions from "./PlayQuizInstructions";
import { User } from "@/types/user";
import { Question } from "@/types/question";

import PlayQuizQuestions from "./PlayQuizQuestions";
import Loading from "../Loading";
import { useQuiz } from "../QuizContext";
import { useRouter } from "next/navigation";

interface IQuizData {
  quizCreator: User;
  questions: Question[];
}

const PlayQuiz = ({ quizId }: { quizId: string }) => {
  const [quizData, setQuizData] = useState<IQuizData | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [question, setQuestion] = useState<Question>();
  const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>(
    undefined
  );
  const [isAnswered, setIsAnswered] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const { playerName, setPlayerName, setPlayerScore } = useQuiz();
  const router = useRouter();

  const handleSubmit = () => {
    if (playerName) {
      setShowQuiz(true);
    }
  };

  const fetchQuiz = async () => {
    try {
      const response = await fetch(`/api/quiz/${quizId}`);
      const data = await response.json();
      console.log(data);
      setQuizData(data);
      setQuestion(data.questions[currentQuestion]);
    } catch (error) {
      console.log("Error fetching quiz data:", error);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  const handleOptionSelect = (option: string) => {
    setSelectedAnswer(option);
    if (option === question?.answer) {
      setPlayerScore((prevScore) => prevScore + 1);
    }

    setTimeout(() => {
      if (quizData && currentQuestion >= quizData.questions.length - 1) {
        return router.push(`/results/${quizId}`);
      }
      setCurrentQuestion((prev) => {
        const nextQuestion = prev + 1;
        if (quizData) {
          setQuestion(quizData.questions[nextQuestion]);
        }
        return nextQuestion;
      });
      setIsAnswered(false);
      setSelectedAnswer(undefined);
    }, 1200);
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1 p-4 sm:px-8">
      {quizData ? (
        <>
          {showQuiz ? (
            <PlayQuizQuestions
              currentQuestion={currentQuestion}
              question={question}
              onOptionSelect={handleOptionSelect}
              selectedAnswer={selectedAnswer}
              isAnswered={isAnswered}
              setIsAnswered={setIsAnswered}
            />
          ) : (
            <PlayQuizInstructions
              quizCreator={quizData?.quizCreator}
              setPlayerName={setPlayerName}
              onSubmit={handleSubmit}
            />
          )}
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default PlayQuiz;
