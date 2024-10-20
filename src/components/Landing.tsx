import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
import { Button } from "./ui/button";
import Link from "next/link";

const Landing = () => {
  const words = [
    {
      text: "How",
    },
    {
      text: "Well",
    },
    {
      text: "Do",
    },
    {
      text: "Your",
    },
    {
      text: "Friends",
    },
    {
      text: "Know",
    },
    {
      text: "You?",
    },
  ];
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <TypewriterEffectSmooth words={words} className="text-4xl" />
      <Button size="lg" asChild>
        <Link href={"/amigo-brain"}>Start Now</Link>
      </Button>
    </div>
  );
};

export default Landing;
