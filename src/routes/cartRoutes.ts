import { Router } from "express";
import { addToCart } from "../controllers/Cart/addToCart";
import { getCart } from "../controllers/Cart/getCart";
import { auth } from "../middlewares/auth";

const router = Router();

router.post("/", auth, addToCart);
router.get("/", auth, getCart);

export default router;