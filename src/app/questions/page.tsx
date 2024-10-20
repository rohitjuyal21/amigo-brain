"use client";
import Loading from "@/components/Loading";
import QuestionWrapper from "@/components/QuestionWrapper";
import { useQuiz } from "@/components/QuizContext";
import { Question } from "@/types/question";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  useEffect(() => {
    if (!quizCreator) {
      router.push("/amigo-brain");
    }
  }, [quizCreator, router]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("/questions.json");
        const data = await response.json();

        const personalizedQuestions = data.map((q: Question) => ({
          ...q,
          question: q.question.replace("{name}", quizCreator),
        }));
        setQuestions(personalizedQuestions);
        setQuestion(personalizedQuestions[currentQuestion]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchQuestions();
  }, [currentQuestion, quizCreator]);

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

  const saveQuiz = async (questionsToSave: Question[]) => {
    try {
      const response = await fetch("/api/quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ questions: questionsToSave }),
      });
      if (response.ok) {
        const { quizId } = await response.json();
        router.push(`/share-quiz/${quizId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNextQuestion = () => {
    if (questions) {
      if (!selectedAnswer) {
        return toast.error("Please select an answer");
      }

      const updatedQuestionsArray = [...updatedQuestions, question!];

      if (currentQuestion >= questions.length - 1) {
        saveQuiz(updatedQuestionsArray);
      } else {
        setUpdatedQuestions(updatedQuestionsArray);
        setCurrentQuestion(currentQuestion + 1);
      }

      setSelectedAnswer(undefined);
    }
  };

  return (
    <div className="p-4 sm:p-8 flex-1 flex flex-col items-center justify-center">
      {!questions || !quizCreator ? (
        <Loading />
      ) : (
        <>
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-center mb-3">
              Hi {quizCreator}
            </h1>
            <p className="text-lg font-semibold text-center leading-snug">
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
