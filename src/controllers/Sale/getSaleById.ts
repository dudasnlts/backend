

import { Request, Response } from "express";
import Sale from "../../models/Sale";

export const getSaleById = async (
  req: Request,
  res: Response
) => {
  try {
    const sale = await Sale.findById(req.params.id);

    if (!sale) {
      return res.status(404).json({
        message: "Promoção não encontrada",
      });
    }

    return res.status(200).json(sale);
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao buscar promoção",
      error,
    });
  }
};