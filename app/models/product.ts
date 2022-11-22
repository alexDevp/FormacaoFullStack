import mongoose, { Schema, Document } from "mongoose";

interface IProduct extends Document {
  _id: string;
  name: string;
  price: number;
  unQ: string;
  tax: number;
  active: boolean;
}

const Product: Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    unQ: {
      type: String,
      required: true,
    },
    tax: {
      type: Number,
      required: true,
    },
    active: {
      type: Boolean,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>("Product", Product, "products");
