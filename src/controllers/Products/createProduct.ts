import { Request, Response } from "express";
import Product from "../../models/Product";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, stock, image, category } = req.body;

    const product = new Product({
      name,
      price,
      stock,
      image,
      category
    });

    await product.save();

    res.status(201).json(product);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};