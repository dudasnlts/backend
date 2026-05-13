import { Router } from "express";
import { createOrder } from "../controllers/Order/createOrder";
import { getOrders } from "../controllers/Order/getOrders";
import { getAllOrders } from "../controllers/Order/getAllOrders";
import { auth } from "../middlewares/auth";
import { isAdmin } from "../middlewares/isAdmin";

const router = Router();

router.post("/", auth, createOrder);
router.get("/", auth, getOrders);

// ADMIN - ver todos os pedidos
router.get("/all", auth, isAdmin, getAllOrders);

export default router;