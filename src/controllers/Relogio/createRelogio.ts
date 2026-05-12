

import { Request, Response } from "express";
import Relogio from "../../models/Relogio";

export const createRelogio = async (
  req: Request,
  res: Response
) => {
  try {
    const relogio = await Relogio.create(req.body);

    return res.status(201).json({
      message: "Relógio criado com sucesso",
      relogio,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao criar relógio",
      error,
    });
  }
};