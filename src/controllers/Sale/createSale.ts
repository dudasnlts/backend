

import { Request, Response } from "express";
import Sale from "../../models/Sale";

export const createSale = async (
  req: Request,
  res: Response
) => {
  try {
    const sale = await Sale.create(req.body);

    return res.status(201).json({
      message: "Produto em promoção criado com sucesso",
      sale,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao criar promoção",
      error,
    });
  }
};