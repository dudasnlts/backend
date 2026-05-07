import { Request, Response } from "express";
import Product from "../../models/Product";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find()
      .populate("category", "name descricao");

    res.json(products);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};