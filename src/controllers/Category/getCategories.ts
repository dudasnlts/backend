import { Request, Response } from "express";
import Category from "../../models/Category";

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();

    res.json(categories);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};