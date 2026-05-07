import { Request, Response } from "express";
import Product from "../../models/Product";

export const listProducts = async (req: Request, res: Response) => {
  try {
    // 🔎 filtros opcionais
    const { category, minPrice, maxPrice, search } = req.query;

    let filter: any = {};

    // 🔥 filtrar por categoria
    if (category) {
      filter.category = category;
    }

    // 🔥 filtrar por preço
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // 🔥 busca por nome
    if (search) {
      filter.name = {
        $regex: search,
        $options: "i" // case insensitive
      };
    }

    const products = await Product.find(filter)
      .populate("category", "name descricao")
      .sort({ createdAt: -1 }); // mais recentes primeiro

    res.json(products);

  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};