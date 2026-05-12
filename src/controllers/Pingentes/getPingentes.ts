

import { Request, Response } from "express";
import Pingente from "../../models/Pingente";

export const getPingentes = async (
  _req: Request,
  res: Response
) => {
  try {
    const pingentes = await Pingente.find().sort({
      createdAt: -1,
    });

    return res.status(200).json(pingentes);
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao buscar pingentes",
      error,
    });
  }
};