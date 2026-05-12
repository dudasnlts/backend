import { Request, Response } from "express";
import Joias from "../../models/Joias";

export const updateJoia = async (req: Request, res: Response) => {
  try {
    const joia = await Joias.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!joia) {
      return res.status(404).json({
        message: "Joia não encontrada",
      });
    }

    return res.status(200).json({
      message: "Joia atualizada com sucesso",
      joia,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};