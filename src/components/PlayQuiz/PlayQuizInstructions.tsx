"use client";
import { ChartColumn, CircleHelp, User2 } from "lucide-react";
import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";
import { Dispatch, FC, SetStateAction } from "react";

import { motion } from "framer-motion";
import InstructionsList from "../InstructionsList";
import { User } from "@/types/user";

const quizInstructions = [
  { text: "Enter your name.", icon: User2 },
  { text: "Answer the Questions about your friend.", icon: CircleHelp },
  {
    text: "Check your score at the scoreboard.",
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

interface IPlayQuizInstructions {
  quizCreator: User | undefined;
  setPlayerName: Dispatch<SetStateAction<string>>;
  onSubmit: () => void;
}

const PlayQuizInstructions: FC<IPlayQuizInstructions> = ({
  quizCreator,
  setPlayerName,
  onSubmit,
}) => {
  return (
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
        <h1 className="text-3xl font-bold text-center ">
          How well do you know {quizCreator?.name}?
        </h1>
        <InstructionsList instructions={quizInstructions} />
        <div>
          <PlaceholdersAndVanishInput
            onSubmit={onSubmit}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholders={placeholders}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default PlayQuizInstructions;
