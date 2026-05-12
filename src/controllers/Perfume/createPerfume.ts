// src/controllers/perfume/createPerfume.ts

import { Request, Response } from "express";
import Perfume from "../../models/Perfume";

export const createPerfume = async (
  req: Request,
  res: Response
) => {
  try {
    const perfume = await Perfume.create(req.body);

    return res.status(201).json({
      message: "Perfume criado com sucesso",
      perfume,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao criar perfume",
      error,
    });
  }
};