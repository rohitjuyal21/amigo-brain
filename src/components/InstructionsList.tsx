import { LucideIcon } from "lucide-react";
import React, { FC } from "react";

interface IInstructionsList {
  instructions: { text: string; icon: LucideIcon }[];
}

const InstructionsList: FC<IInstructionsList> = ({ instructions }) => {
  return (
    <div className="flex flex-col justify-start">
      <h4 className="text-lg sm:text-xl font-medium mb-3">Instructions:</h4>
      <ul className="space-y-3">
        {instructions.map((instruction, index) => (
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
  );
};

export default InstructionsList;
