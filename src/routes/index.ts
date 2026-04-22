import express from "express"
import authRoutes from "./auth.js"
import productRoutes from "./product.js" // Importe sempre em minúsculo para rotas

const router = express.Router()

// Agrupando as rotas
router.use("/auth", authRoutes)
router.use("/products", productRoutes) 

export default router