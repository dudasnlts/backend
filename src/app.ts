import express from "express";
import cors from "cors";
import path from "path";

import categoryRoute from "./routes/categoryRoute";
import productsRoute from "./routes/productsRoute";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import cartRoutes from "./routes/cartRoutes";
import orderRoutes from "./routes/orderRoutes";
import joiasRoutes from "./routes/joias.routes";
import perfumeRoutes from "./routes/perfume.routes";
import pingentesRoutes from "./routes/pingentes.routes";
import relogioRoutes from "./routes/relogio.routes";
import saleRoutes from "./routes/sale.routes";

const app = express();

app.use(cors());

app.use(express.json());

/*
|--------------------------------------------------------------------------
| LIBERAR ARQUIVOS DA PASTA UPLOADS
|--------------------------------------------------------------------------
| Agora imagens e vídeos poderão ser acessados:
|
| http://localhost:3333/uploads/video.mp4
|
*/

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "..", "uploads")
  )
);

/*
|--------------------------------------------------------------------------
| ROUTES
|--------------------------------------------------------------------------
*/

app.use("/api/categories", categoryRoute);

app.use("/api/products", productsRoute);

app.use("/api/users", userRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/cart", cartRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/joias", joiasRoutes);

app.use("/api/perfumes", perfumeRoutes);

app.use("/api/pingentes", pingentesRoutes);

app.use("/api/relogios", relogioRoutes);

app.use("/api/sales", saleRoutes);

export default app;