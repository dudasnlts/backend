

import mongoose, { Schema, Document } from "mongoose";

export interface IPingente extends Document {
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
  material: string;
  createdAt: Date;
}

const PingenteSchema: Schema = new Schema(
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

    material: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IPingente>("Pingente", PingenteSchema);