import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const Result = () => {
  return (
    <div className="flex items-center flex-col gap-6 sm:gap-8 w-full">
      <h3 className="text-3xl font-bold">Friendboard</h3>
      <div className="w-full">
        <Table className="border">
          <TableHeader>
            <TableRow>
              <TableHead className="text-lg">Name</TableHead>
              <TableHead className="text-lg">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="text-lg">John Doe</TableCell>
              <TableCell className="text-lg">4/10</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Result;
