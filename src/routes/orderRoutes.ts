import { Router } from "express";
import { createOrder } from "../controllers/Order/createOrder";
import { getOrders } from "../controllers/Order/getOrders";
import { auth } from "../middlewares/auth";

const router = Router();

router.post("/", auth, createOrder);
router.get("/", auth, getOrders);

export default router;