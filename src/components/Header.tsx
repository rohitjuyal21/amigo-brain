"use client";
import { Button } from "@nextui-org/button";
import { Github, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";

const Header = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  if (!mounted) {
    return null;
  }

  return (
    <header className="px-4 sm:px-8 py-4 flex items-center justify-between">
      <div>
        <Link href={"/"} className="text-2xl font-bold">
          Amigo Brain 🧠
        </Link>
      </div>
      <div className="space-x-1">
        <Button isIconOnly variant="light" onClick={toggleTheme}>
          {theme === "light" ? (
            <Moon className="size-5" />
          ) : (
            <Sun className="size-5" />
          )}
        </Button>

        <Link
          href={"https://github.com/rohitjuyal21/amigo-brain"}
          target="_blank"
        >
          <Button isIconOnly variant="light">
            <Github className="size-5" />
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
