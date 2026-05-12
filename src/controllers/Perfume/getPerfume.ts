// src/controllers/perfume/getPerfumes.ts

import { Request, Response } from "express";
import Perfume from "../../models/Perfume";

export const getPerfumes = async (
  _req: Request,
  res: Response
) => {
  try {
    const perfumes = await Perfume.find().sort({
      createdAt: -1,
    });

    return res.status(200).json(perfumes);
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao buscar perfumes",
      error,
    });
  }
};