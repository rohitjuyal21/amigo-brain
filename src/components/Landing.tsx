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

  const handleSubmit = () => {
    router.push("/questions");
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1 p-4 sm:px-8">
      <div className="max-w-xl space-y-6 sm:space-y-8 bg-muted/50 p-6 sm:p-8 rounded-xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-center ">
          Are you my
          <FlipWords words={words} />?
        </h1>
        <div className="flex flex-col justify-start">
          <h4 className="text-lg sm:text-xl font-medium mb-3">Instructions:</h4>
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
      </div>
    </div>
  );
};

export default Landing;
