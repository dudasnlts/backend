

import { Request, Response } from "express";
import Pingente from "../../models/Pingente";

export const deletePingente = async (
  req: Request,
  res: Response
) => {
  try {
    const pingente = await Pingente.findByIdAndDelete(
      req.params.id
    );

    if (!pingente) {
      return res.status(404).json({
        message: "Pingente não encontrado",
      });
    }

    return res.status(200).json({
      message: "Pingente deletado com sucesso",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao deletar pingente",
      error,
    });
  }
};