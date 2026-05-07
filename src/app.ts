import express from "express";
import cors from "cors";

import categoryRoute from "./routes/categoryRoute";
import productsRoute from "./routes/productsRoute";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import cartRoutes from "./routes/cartRoutes";
import orderRoutes from "./routes/orderRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/categories", categoryRoute);
app.use("/api/products", productsRoute);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

export default app;