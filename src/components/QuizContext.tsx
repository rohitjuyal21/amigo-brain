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
  playerName: string;
  setPlayerName: Dispatch<SetStateAction<string>>;
  playerScore: number;
  setPlayerScore: Dispatch<SetStateAction<number>>;
}

const QuizContext = createContext<IQuizContext | undefined>(undefined);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [quizCreator, setQuizCreator] = useState<string>("");
  const [playerName, setPlayerName] = useState<string>("");
  const [playerScore, setPlayerScore] = useState<number>(0);

  return (
    <QuizContext.Provider
      value={{
        quizCreator,
        setQuizCreator,
        playerName,
        setPlayerName,
        playerScore,
        setPlayerScore,
      }}
    >
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
