// src/controllers/perfume/getPerfumeById.ts

import { Request, Response } from "express";
import Perfume from "../../models/Perfume";

export const getPerfumeById = async (
  req: Request,
  res: Response
) => {
  try {
    const perfume = await Perfume.findById(req.params.id);

    if (!perfume) {
      return res.status(404).json({
        message: "Perfume não encontrado",
      });
    }

    return res.status(200).json(perfume);
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao buscar perfume",
      error,
    });
  }
};