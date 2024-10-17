"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface IQuizContext {
  quizCreator: string;
  setQuizCreator: Dispatch<SetStateAction<string>>;
}

const QuizContext = createContext<IQuizContext | undefined>(undefined);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [quizCreator, setQuizCreator] = useState<string>("");

  return (
    <QuizContext.Provider value={{ quizCreator, setQuizCreator }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
};
