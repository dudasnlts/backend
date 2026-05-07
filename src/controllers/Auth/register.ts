import { Request, Response } from "express";
import User from "../../models/User";
import bcrypt from "bcryptjs";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Nome, email e senha são obrigatórios" });
    }

    // Verifica se já existe usuário com esse email
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: "user" // registro público sempre cria usuário comum
    });

    await user.save();

    res.status(201).json({ message: "Conta criada com sucesso!" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};