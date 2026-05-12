

import { Request, Response } from "express";
import Relogio from "../../models/Relogio";

export const updateRelogio = async (
  req: Request,
  res: Response
) => {
  try {
    const relogio = await Relogio.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!relogio) {
      return res.status(404).json({
        message: "Relógio não encontrado",
      });
    }

    return res.status(200).json({
      message: "Relógio atualizado com sucesso",
      relogio,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao atualizar relógio",
      error,
    });
  }
};