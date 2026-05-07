import { Request, Response } from "express";
import Category from "../../models/Category";

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { name, descricao } = req.body;

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, descricao },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({ message: "Categoria não encontrada" });
    }

    res.json(category);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// CURL 