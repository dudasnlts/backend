// src/controllers/perfume/deletePerfume.ts

import { Request, Response } from "express";
import Perfume from "../../models/Perfume";

export const deletePerfume = async (
  req: Request,
  res: Response
) => {
  try {
    const perfume = await Perfume.findByIdAndDelete(
      req.params.id
    );

    if (!perfume) {
      return res.status(404).json({
        message: "Perfume não encontrado",
      });
    }

    return res.status(200).json({
      message: "Perfume deletado com sucesso",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao deletar perfume",
      error,
    });
  }
};