import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "react-hot-toast";
import { QuizProvider } from "@/components/QuizContext";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Amigo Brain",
  description: "Do You Know Me?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased min-h-screen `}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QuizProvider>
            <div className="max-w-screen-lg mx-auto flex flex-col min-h-screen h-full">
              <Header />
              {children}
            </div>
            <Toaster />
          </QuizProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
