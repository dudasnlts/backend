

import { Request, Response } from "express";
import Relogio from "../../models/Relogio";

export const deleteRelogio = async (
  req: Request,
  res: Response
) => {
  try {
    const relogio = await Relogio.findByIdAndDelete(
      req.params.id
    );

    if (!relogio) {
      return res.status(404).json({
        message: "Relógio não encontrado",
      });
    }

    return res.status(200).json({
      message: "Relógio deletado com sucesso",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao deletar relógio",
      error,
    });
  }
};