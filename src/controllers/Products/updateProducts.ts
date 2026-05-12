import { Request, Response } from "express";
import Product from "../../models/Product";

export const updateProduct = async (
  req: Request,
  res: Response
) => {

  try {

    const product = await Product.findById(
      req.params.id
    );

    if (!product) {

      return res.status(404).json({
        message: "Produto não encontrado"
      });

    }

    const image = req.file
      ? `/uploads/${req.file.filename}`
      : product.image;

    const updated = await Product.findByIdAndUpdate(

      req.params.id,

      {
        ...req.body,
        image
      },

      {
        new: true
      }

    );

    res.json(updated);

  } catch (error: any) {

    res.status(500).json({
      error: error.message
    });

  }

};