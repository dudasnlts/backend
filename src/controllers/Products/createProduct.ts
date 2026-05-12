import { Request, Response } from "express";
import Product from "../../models/Product";

export const createProduct = async (
  req: Request,
  res: Response
) => {

  try {

    const {
      name,
      description,
      price,
      stock,
      category
    } = req.body;

    const image = req.file
      ? `/uploads/${req.file.filename}`
      : "";

    const product = new Product({

      name,
      description,
      price,
      stock,
      category,
      image

    });

    await product.save();

    res.status(201).json(product);

  } catch (error: any) {

    res.status(500).json({
      error: error.message
    });

  }

};