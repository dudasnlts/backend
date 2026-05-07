import "dotenv/config";
import mongoose from "mongoose";
import app from "./src/app";

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/ivyStore";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB conectado 💎"))
  .catch((err) => {
    console.error("Erro ao conectar no MongoDB:", err);
    process.exit(1);
  });

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT} 🚀`);
});