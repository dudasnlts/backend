
import mongoose, { Schema, Document } from "mongoose";

export interface IJoia extends Document {
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
  category: string;
  createdAt: Date;
}

const JoiaSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    stock: {
      type: Number,
      default: 0,
    },

    category: {
      type: String,
      default: "Joias",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IJoia>("Joia", JoiaSchema);