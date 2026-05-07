import { Request, Response } from "express";
import User from "../../models/User";
import bcrypt from "bcryptjs";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    // 🔍 DEBUG (pode apagar depois)
    console.log("BODY:", req.body);

    // 🔐 criptografa senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔥 garante role correto
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: role === "admin" ? "admin" : "user"
    });

    await user.save();

    // 🔍 DEBUG (confirma salvou certo)
    console.log("SALVO:", user);

    res.status(201).json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};