import { Request, Response } from "express";
import Joias from "../../models/Joias";

export const getJoias = async (_req: Request, res: Response) => {
  try {
    const joias = await Joias.find().sort({ createdAt: -1 });

    return res.status(200).json(joias);
  } catch (error) {
    return res.status(500).json(error);
  }
};