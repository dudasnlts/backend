import { Request, Response } from "express";
import Product from "../../models/Product";

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    res.json({ message: "Produto deletado com sucesso" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};