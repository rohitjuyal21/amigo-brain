"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import Link from "next/link";
import Friendboard from "./Friendboard";
import { useQuiz } from "./QuizContext";
import { useRouter } from "next/navigation";
import Loading from "./Loading";

const getMessageByScore = (score: number) => {
  if (score === 0) {
    return "Seriously? Do you even know me? 😂";
  } else if (score >= 1 && score <= 2) {
    return "Are we even friends? 😅";
  } else if (score >= 3 && score <= 5) {
    return "Okay, you’re trying... but still, yikes! 😬";
  } else if (score >= 6 && score <= 7) {
    return "Not bad! You’re getting there, buddy! 👍";
  } else if (score === 8 || score === 9) {
    return "Almost perfect! You're really close! 🤭";
  } else if (score === 10) {
    return "10/10! You must have superpowers! 🦸‍♂️";
  }
};

const Result = ({ quizId }: { quizId: string }) => {
  const { playerScore, setPlayerScore } = useQuiz();
  const router = useRouter();

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const response = await fetch(`/api/quiz/player/${quizId}`);
        console.log(response);
        const data = await response.json();
        if (response.ok) {
          setPlayerScore(data.score);
        } else {
          return router.push(`/play-quiz/${quizId}`);
        }
      } catch (error) {
        console.log("Error fetching Player", error);
      }
    };
    fetchPlayer();
  }, [quizId, router, setPlayerScore]);

  return (
    <div className="flex flex-col items-center justify-center flex-1 p-4 sm:px-8">
      {playerScore ? (
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="w-full flex flex-col items-center space-y-8"
        >
          <div className="max-w-2xl w-full bg-muted/50 p-6 sm:p-8 rounded-xl">
            <div className="w-full">
              <h4 className="text-xl text-center font-semibold text-muted-foreground">
                Your Score:
              </h4>
              <h1 className="sm:text-4xl text-3xl font-bold text-center my-2">
                {playerScore} out of 10
              </h1>
              <p className="text-xl font-medium text-center">
                {getMessageByScore(playerScore)}
              </p>
            </div>
          </div>
          <div className=" flex flex-col items-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-center">
              Create your Quiz
            </h2>
            <p className="text-lg font-medium text-muted-foreground text-center mt-2 mb-6">
              It&apos;s your turn now. Create your quiz and send it to your
              friends!
            </p>
            <Button asChild>
              <Link href={"/amigo-brain"}>Get Started</Link>
            </Button>
          </div>
          <Friendboard quizId={quizId} />
        </motion.div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Result;
