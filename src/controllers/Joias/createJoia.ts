import { Request, Response } from "express";
import Joias from "../../models/Joias";

export const createJoia = async (req: Request, res: Response) => {
  try {
    const joia = await Joias.create(req.body);

    return res.status(201).json({
      message: "Joia criada com sucesso",
      joia,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};