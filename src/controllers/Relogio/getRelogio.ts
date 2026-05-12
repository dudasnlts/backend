

import { Request, Response } from "express";
import Relogio from "../../models/Relogio";

export const getRelogios = async (
  _req: Request,
  res: Response
) => {
  try {
    const relogios = await Relogio.find().sort({
      createdAt: -1,
    });

    return res.status(200).json(relogios);
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao buscar relógios",
      error,
    });
  }
};