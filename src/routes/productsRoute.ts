import { Router } from "express";

// controllers
import { createProduct } from "../controllers/Products/createProduct";
import { getProducts } from "../controllers/Products/getProducts";
import { getProductById } from "../controllers/Products/getProductById";
import { updateProduct } from "../controllers/Products/updateProducts";
import { deleteProduct } from "../controllers/Products/deleteProducts";

// middlewares 
import { auth } from "../middlewares/auth";
import { isAdmin } from "../middlewares/isAdmin";

const router = Router();

// 🔓 ROTAS PÚBLICAS
router.get("/", getProducts);
router.get("/:id", getProductById);

// 🔐 ROTAS PROTEGIDAS (SÓ ADMIN)
router.post("/", auth, isAdmin, createProduct);
router.put("/:id", auth, isAdmin, updateProduct);
router.delete("/:id", auth, isAdmin, deleteProduct);

export default router;