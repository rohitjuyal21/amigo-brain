import { model, models, Schema } from "mongoose";

const ScoreSchema = new Schema({
  playerName: { type: String, required: true },
  score: { type: Number, required: true },
});

const QuestionSchema = new Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  answer: { type: String, required: true },
});

interface IQuiz extends Document {
  creator: Schema.Types.ObjectId;
  questions: {
    questionText: string;
    options: string[];
    correctAnswer: string;
  }[];
  quizId: string;
  scores: {
    playerName: string;
    score: number;
  }[];
}

const QuizSchema: Schema<IQuiz> = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  questions: [QuestionSchema],
  quizId: { type: String, unique: true, required: true },
  scores: [ScoreSchema],
});

export const Quiz = models.Quiz || model<IQuiz>("Quiz", QuizSchema);
