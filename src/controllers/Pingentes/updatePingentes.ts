

import { Request, Response } from "express";
import Pingente from "../../models/Pingente";

export const updatePingente = async (
  req: Request,
  res: Response
) => {
  try {
    const pingente = await Pingente.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!pingente) {
      return res.status(404).json({
        message: "Pingente não encontrado",
      });
    }

    return res.status(200).json({
      message: "Pingente atualizado com sucesso",
      pingente,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao atualizar pingente",
      error,
    });
  }
};