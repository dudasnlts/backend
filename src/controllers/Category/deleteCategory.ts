import { Request, Response } from "express";
import Category from "../../models/Category";

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Categoria não encontrada" });
    }

    res.json({ message: "Categoria deletada com sucesso" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};