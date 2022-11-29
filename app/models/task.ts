import mongoose, { Schema, Document, Types } from "mongoose";

interface ITask extends Document {
  _id: string;
  title: string;
  description: number;
  userId: Types.ObjectId;
  state: string;
}

const Task: Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    state: {
      type: Boolean,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ITask>("Task", Task, "tasks");
