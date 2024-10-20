import { Question } from "./question";
import { User } from "./user";

export interface IQuizData {
  quizCreator: User;
  questions: Question[];
}
