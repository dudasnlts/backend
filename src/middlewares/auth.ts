import jwt from "jsonwebtoken";

export const auth = (req: any, res: any, next: any) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Token não enviado" });
    }

    // ✅ usa JWT_SECRET do .env — deve ser o mesmo usado no login
    const secret = process.env.JWT_SECRET || "segredo";
    const decoded = jwt.verify(token, secret);

    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
};