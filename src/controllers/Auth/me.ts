import { Request, Response } from "express";
import User from "../../models/User";
import bcrypt from "bcryptjs";

export const getMe = async (req: any, res: Response) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ error: "Erro interno" });
  }
};

export const updateMe = async (req: any, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const update: any = {};
    if (name) update.name = name;
    if (email) update.email = email;
    if (password && password.length >= 6) {
      update.password = await bcrypt.hash(password, 10);
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      update,
      { new: true, select: "-password" }
    );

    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

    res.json(user);
  } catch (error: any) {
    res.status(500).json({ error: "Erro interno" });
  }
};
