

import { Request, Response } from "express";
import Sale from "../../models/Sale";

export const deleteSale = async (
  req: Request,
  res: Response
) => {
  try {
    const sale = await Sale.findByIdAndDelete(
      req.params.id
    );

    if (!sale) {
      return res.status(404).json({
        message: "Promoção não encontrada",
      });
    }

    return res.status(200).json({
      message: "Promoção deletada com sucesso",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao deletar promoção",
      error,
    });
  }
};