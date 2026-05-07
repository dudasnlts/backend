import { Request, Response } from "express";
import User from "../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email e senha são obrigatórios" });
    }

    // .lean() retorna objeto JS simples, contornando o toJSON() que remove a senha
    const user = await User.findOne({ email }).lean();

    if (!user) {
      return res.status(400).json({ error: "Usuário não encontrado" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ error: "Senha incorreta" });
    }

    // ✅ usa JWT_SECRET do .env
    const secret = process.env.JWT_SECRET || "segredo";

    const token = jwt.sign(
      { id: user._id, role: user.role },
      secret,
      { expiresIn: "1d" }
    );

    // ✅ Retorna token + dados do usuário (sem senha)
    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error: any) {
    res.status(500).json({ error: "Erro interno no servidor" });
  }
};