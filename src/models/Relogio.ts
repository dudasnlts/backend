

import mongoose, { Schema, Document } from "mongoose";

export interface IRelogio extends Document {
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
  brand: string;
  createdAt: Date;
}

const RelogioSchema: Schema = new Schema(
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

    brand: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IRelogio>("Relogio", RelogioSchema);