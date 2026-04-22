

// Importação das Rotas
import authRoutes from "./routes/auth.ts";
import productRoutes from "./routes/product.ts";

// Importação dos Models
import User from "./models/User.ts";
import Product from "./models/Product.ts"; // Importando do arquivo correto
import mongoose from "mongoose";
import express from "express";

dotenv.config();

const app = express();

/* ================= MIDDLEWARES ================= */
app.use(cors());
app.use(express.json());

/* ================= CONEXÃO MONGODB & SEED ================= */
mongoose.connect(process.env.MONGO_URL)
  .then(async () => {
    console.log("Maison Ivy: MongoDB conectado ✅");

    /* --- SEED: ADMINISTRADOR --- */
    // Criamos o admin se ele não existir para facilitar seus testes
    const adminExists = await User.findOne({ role: "admin" });
    if (!adminExists) {
      const hash = await bcrypt.hash("123456", 10);
      await User.create({
        name: "Admin Ivy",
        email: "admin@admin.com",
        password: hash,
        role: "admin"
      });
      console.log("Admin gerado automaticamente: admin@admin.com / 123456 🔑");
    }

    /* --- SEED: PRODUTO INICIAL --- */
    // Criamos um produto inicial caso o banco esteja vazio
    const productExists = await Product.findOne();
    if (!productExists) {
      await Product.create({
        name: "Anel de Diamante Ivy",
        price: 2500,
        stock: 5,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=500"
      });
      console.log("Produto de teste criado na Maison Ivy ✅");
    }
  })
  .catch(err => {
    console.error("Erro crítico ao conectar ao MongoDB ❌:", err.message);
  });

/* ================= ROTAS ================= */

// Rotas de Autenticação (Acesso via http://localhost:PORT/auth)
app.use("/auth", authRoutes); 

// Rotas de Produtos (Acesso via http://localhost:PORT/products)
app.use("/products", productRoutes);

// Rota Principal / Diagnóstico
app.get("/", (req, res) => {
  res.status(200).json({ 
    status: "Online", 
    message: "Maison Ivy API Rodando 🔥",
    version: "1.0.0"
  });
});

/* ================= TRATAMENTO DE ERROS GLOBAL ================= */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: "Ocorreu um erro interno no servidor." 
  });
});

export default app;