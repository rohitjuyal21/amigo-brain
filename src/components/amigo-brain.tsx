"use client";
import {
  ChartColumn,
  CircleHelp,
  ExternalLink,
  Link,
  User2,
  Users2,
} from "lucide-react";
import { FlipWords } from "./ui/flip-words";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { motion } from "framer-motion";
import { useQuiz } from "./QuizContext";
import InstructionsList from "./InstructionsList";

const words = ["Amigo", "Friend", "Dost", "Freund", "Ami"];

const quizInstructions = [
  { text: "Enter your name.", icon: User2 },
  { text: "Answer 10 questions about yourself.", icon: CircleHelp },
  { text: "Your quiz link will be generated.", icon: Link },
  { text: "Share the quiz link with your friends.", icon: ExternalLink },
  {
    text: "Your friends will attempt to guess the correct answers.",
    icon: Users2,
  },
  {
    text: "Check how your friends scored by visiting your quiz link.",
    icon: ChartColumn,
  },
];

const placeholders = [
  "What's your name?",
  "Enter your name",
  "Who's playing?",
  "Type your name here",
  "Your name, please",
  "Tell us your name",
];

const AmigoBrain = () => {
  const [name, setName] = useState("");
  const { setQuizCreator } = useQuiz();
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      if (response.ok) {
        const data = await response.json();
        setQuizCreator(data);
        return router.push("/questions");
      }
    } catch (error) {
      console.log("Error while adding user", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1 p-4 sm:px-8">
      <div className="max-w-2xl w-full bg-muted/50 p-6 sm:p-8 rounded-xl">
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className=" space-y-6 sm:space-y-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-center ">
            Are you my
            <FlipWords words={words} />?
          </h1>
          <InstructionsList instructions={quizInstructions} />
          <div>
            <PlaceholdersAndVanishInput
              onSubmit={handleSubmit}
              onChange={(e) => setName(e.target.value)}
              placeholders={placeholders}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AmigoBrain;
