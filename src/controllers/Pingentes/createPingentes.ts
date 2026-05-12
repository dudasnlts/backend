

import { Request, Response } from "express";
import Pingente from "../../models/Pingente";

export const createPingente = async (
  req: Request,
  res: Response
) => {
  try {
    const pingente = await Pingente.create(req.body);

    return res.status(201).json({
      message: "Pingente criado com sucesso",
      pingente,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao criar pingente",
      error,
    });
  }
}; 