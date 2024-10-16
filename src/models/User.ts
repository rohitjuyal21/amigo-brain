import { model, models, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

export const User = models.User || model<IUser>("User", userSchema);
