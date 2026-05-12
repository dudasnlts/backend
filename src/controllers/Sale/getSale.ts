

import { Request, Response } from "express";
import Sale from "../../models/Sale";

export const getSales = async (
  _req: Request,
  res: Response
) => {
  try {
    const sales = await Sale.find().sort({
      createdAt: -1,
    });

    return res.status(200).json(sales);
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao buscar promoções",
      error,
    });
  }
};