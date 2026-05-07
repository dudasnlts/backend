import { Request, Response } from "express";
import Category from "../../models/Category";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, descricao } = req.body;

    const category = new Category({
      name,
      descricao
    });

    await category.save();

    res.status(201).json(category);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};