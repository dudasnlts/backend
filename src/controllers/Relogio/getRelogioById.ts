

import { Request, Response } from "express";
import Relogio from "../../models/Relogio";

export const getRelogioById = async (
  req: Request,
  res: Response
) => {
  try {
    const relogio = await Relogio.findById(req.params.id);

    if (!relogio) {
      return res.status(404).json({
        message: "Relógio não encontrado",
      });
    }

    return res.status(200).json(relogio);
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao buscar relógio",
      error,
    });
  }
};