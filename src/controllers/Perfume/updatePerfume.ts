// src/controllers/perfume/updatePerfume.ts

import { Request, Response } from "express";
import Perfume from "../../models/Perfume";

export const updatePerfume = async (
  req: Request,
  res: Response
) => {
  try {
    const perfume = await Perfume.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!perfume) {
      return res.status(404).json({
        message: "Perfume não encontrado",
      });
    }

    return res.status(200).json({
      message: "Perfume atualizado com sucesso",
      perfume,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao atualizar perfume",
      error,
    });
  }
};