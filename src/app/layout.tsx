import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "react-hot-toast";
import { QuizProvider } from "@/components/QuizContext";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AmigoBrain - Create and Play Fun Quiz with Friends",
  description:
    "Create personalized quiz about yourself, share with friends, and see who knows you best! Play, score, and compare with the Friendboard.",
  openGraph: {
    title: "AmigoBrain - Create and Play Fun Quiz",
    description:
      "Create personalized quiz about yourself, share with friends, and see who knows you best! Play, score, and check the Friendboard for results.",
    url: "https://amigo-brain.vercel.app/",
    images: [
      {
        url: "https://amigo-brain.vercel.app/amigo-brain/image_1.png",
        alt: "AmigoBrain Quiz App",
      },
    ],
    siteName: "AmigoBrain",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AmigoBrain - Fun Quiz with Friends",
    description:
      "Create quiz, share them with friends, and see who knows you best! Check the Friendboard for the final score.",
    images: "https://amigo-brain.vercel.app/amigo-brain/image_1.png",
  },
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
            <Analytics />
            <Toaster />
          </QuizProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
