import { Button } from "./ui/button";
import Link from "next/link";
import { TextGenerateEffect } from "./ui/text-generate-effect";

const Landing = () => {
  const words = `How Well Do Your Friends Know You?`;

  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <TextGenerateEffect words={words} className="text-center mb-4 sm:mb-6" />
      <Button size="lg" asChild>
        <Link href={"/amigo-brain"}>Start Now</Link>
      </Button>
    </div>
  );
};

export default Landing;
