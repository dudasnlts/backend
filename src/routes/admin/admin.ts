import { JsonWebTokenError } from "jsonwebtoken";

export default function(req: any, res: any, next: any) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: "Não autorizado" });

  try {
    const decoded = JsonWebTokenError.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Acesso negado" });
    }
    req.userId = decoded.id;
    next();
  } catch {
    res.status(403).json({ message: "Token inválido" });
  }
} 