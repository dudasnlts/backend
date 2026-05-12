

import { Request, Response } from "express";
import Sale from "../../models/Sale";

export const updateSale = async (
  req: Request,
  res: Response
) => {
  try {
    const sale = await Sale.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!sale) {
      return res.status(404).json({
        message: "Promoção não encontrada",
      });
    }

    return res.status(200).json({
      message: "Promoção atualizada com sucesso",
      sale,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao atualizar promoção",
      error,
    });
  }
};