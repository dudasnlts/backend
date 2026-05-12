

import mongoose, { Schema, Document } from "mongoose";

export interface ISale extends Document {
  name: string;
  description: string;
  originalPrice: number;
  salePrice: number;
  discount: number;
  image: string;
  stock: number;
  createdAt: Date;
}

const SaleSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    originalPrice: {
      type: Number,
      required: true,
    },

    salePrice: {
      type: Number,
      required: true,
    },

    discount: {
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
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ISale>("Sale", SaleSchema);