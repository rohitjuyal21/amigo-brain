import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface IResult {
  playerName: string;
  score: number;
  _id: string;
}

const Friendboard = ({ quizId }: { quizId: string }) => {
  const [result, setResult] = useState<IResult[] | null>(null);

  useEffect(() => {
    const fetchQuizResult = async () => {
      try {
        const response = await fetch(`/api/quiz/result/${quizId}`);
        const data = await response.json();
        setResult(data.result);
      } catch (error) {
        console.log("Error fetching result", error);
      }
    };

    fetchQuizResult();
  }, []);

  return (
    <div className="flex items-center flex-col gap-6 sm:gap-8 max-w-2xl w-full">
      <h3 className="text-3xl font-bold">Friendboard</h3>
      {!result || result.length === 0 ? (
        <p className="text-lg text-muted-foreground text-center">
          You&apos;ll see here who knows you best once someone plays! 🎯
        </p>
      ) : (
        <div className="w-full">
          <Table className="border">
            <TableHeader>
              <TableRow>
                <TableHead className="text-lg text-center">Name</TableHead>
                <TableHead className="text-lg text-center">Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {result?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="text-lg text-center">
                    {item.playerName}
                  </TableCell>
                  <TableCell className="text-lg text-center">
                    {item.score}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default Friendboard;
