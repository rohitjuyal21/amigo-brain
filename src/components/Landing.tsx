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

const Landing = () => {
  const [name, setName] = useState("");
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
      if (response.ok) return router.push("/questions");
    } catch (error) {
      console.log("Error while adding user", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1 p-4 sm:px-8">
      <div className="max-w-xl bg-muted/50 p-6 sm:p-8 rounded-xl">
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
          <div className="flex flex-col justify-start">
            <h4 className="text-lg sm:text-xl font-medium mb-3">
              Instructions:
            </h4>
            <ul className="space-y-2">
              {quizInstructions.map((instruction, index) => (
                <li
                  key={index}
                  className="sm:text-lg font-medium text-muted-foreground flex justify-start items-center gap-2"
                >
                  <instruction.icon className="size-5 flex-shrink-0" />
                  {instruction.text}
                </li>
              ))}
            </ul>
          </div>
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

export default Landing;
