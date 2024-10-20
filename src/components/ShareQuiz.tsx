"use client";
import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import Friendboard from "./Friendboard";
import { IQuizData } from "@/types/quizData";
import Loading from "./Loading";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import copy from "copy-to-clipboard";

const ShareQuiz = ({ quizId }: { quizId: string }) => {
  const [isCopied, setIsCopied] = useState(false);
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);
  const [quiz, setQuiz] = useState<IQuizData | null>(null);
  const router = useRouter();
  const quizLink = `${process.env.NEXT_PUBLIC_BASE_URL}/play-quiz/${quizId}`;

  const handleCopyLink = () => {
    copy(quizLink);
    toast.success("Link Copied!");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const fetchQuizData = async () => {
    try {
      const response = await fetch(`/api/quiz/${quizId}`);
      if (response.ok) {
        const data = await response.json();
        setQuiz(data);
      }
    } catch (error) {
      console.log("Error fetching quiz data:", error);
    }
  };

  useEffect(() => {
    fetchQuizData();
  }, []);

  const handleDeleteQuiz = async () => {
    try {
      const response = await fetch(`/api/quiz/${quizId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        toast.success("Quiz deleted successfully!");
        router.push("/amigo-brain");
      }
    } catch (error) {
      console.log("Error deleting quiz", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1 p-4 sm:p-8">
      <>
        {quiz ? (
          <>
            <motion.div
              initial={{ opacity: 0.0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="w-full"
            >
              <div className="space-y-10 flex flex-col items-center">
                <div className="max-w-2xl w-full bg-muted/50 p-6 sm:p-8 rounded-xl space-y-6 sm:space-y-8">
                  <div>
                    <h1 className="text-2xl mb-4 sm:text-3xl font-bold text-center ">
                      {quiz?.quizCreator.name} your Quiz is ready!
                    </h1>
                    <p className="text-lg font-semibold text-center">
                      Share your quiz with all your friends and see their
                      results.
                    </p>
                  </div>
                  <div className="flex items-center flex-col space-y-4">
                    <div
                      onClick={handleCopyLink}
                      className={`rounded-xl text-base sm:text-lg font-medium bg-background px-2 sm:px-6 py-4 text-center cursor-pointer w-full transition-all duration-300 border-2 ${
                        isCopied ? " border-green-500" : ""
                      }`}
                    >
                      {quizLink}
                    </div>
                    <Button onClick={handleCopyLink}>Copy Link</Button>
                  </div>
                </div>
                <Friendboard quizId={quizId} />
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Delete Quiz</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your Quiz.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <Button variant="destructive" onClick={handleDeleteQuiz}>
                        Delete
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </motion.div>
            {showConfetti && (
              <Confetti
                width={width - 20}
                height={height}
                recycle={false}
                numberOfPieces={500}
              />
            )}
          </>
        ) : (
          <Loading />
        )}
      </>
    </div>
  );
};
export default ShareQuiz;
