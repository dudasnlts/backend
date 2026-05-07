import mongoose, { Document, Schema } from "mongoose";

// Interface (tipagem)
export interface ICategory extends Document {
  name: string;
  descricao?: string;
  createdAt: Date;
  updatedAt: Date;
}

//  Schema
const CategorySchema: Schema = new Schema(
  {
    name: { 
      type: String, 
      required: true 
    },
    descricao: { 
      type: String 
    }
  },
  { timestamps: true }
);

//  Model
const Category = mongoose.model<ICategory>("Category", CategorySchema);

export default Category;