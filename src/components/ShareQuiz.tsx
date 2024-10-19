"use client";
import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import Friendboard from "./Friendboard";

const ShareQuiz = ({ quizId }: { quizId: string }) => {
  const [isCopied, setIsCopied] = useState(false);
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(false);

  const quizLink = `${process.env.NEXT_PUBLIC_BASE_URL}/play-quiz/${quizId}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(quizLink);
    toast.success("Link Copied!");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center flex-1 p-4 sm:p-8">
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
              <h1 className="text-3xl mb-6 sm:text-4xl font-bold text-center ">
                Your Quiz is ready!
              </h1>
              <p className="text-xl font-semibold text-center">
                Share your quiz with all your friends and see their results.
              </p>
            </div>
            <div className="flex items-center flex-col space-y-4">
              <div
                onClick={handleCopyLink}
                className={`rounded-xl text-lg font-medium bg-background px-6 py-4 text-center cursor-pointer w-full transition-all duration-300 border-2 ${
                  isCopied ? " border-green-500" : ""
                }`}
              >
                {quizLink}
              </div>
              <Button onClick={handleCopyLink}>Copy Link</Button>
            </div>
          </div>
          <Friendboard />
          <Button variant="destructive">Delete Quiz</Button>
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
    </div>
  );
};

export default ShareQuiz;
