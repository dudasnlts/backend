import { Request, Response } from "express";
import Joias from "../../models/Joias";

export const deleteJoia = async (req: Request, res: Response) => {
  try {
    const joia = await Joias.findByIdAndDelete(req.params.id);

    if (!joia) {
      return res.status(404).json({
        message: "Joia não encontrada",
      });
    }

    return res.status(200).json({
      message: "Joia deletada com sucesso",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};