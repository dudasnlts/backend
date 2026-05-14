import { Router } from "express";
import { login } from "../controllers/Auth/login";
import { register } from "../controllers/Auth/register";
import { getMe, updateMe } from "../controllers/Auth/me";
import { auth } from "../middlewares/auth";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.get("/me", auth, getMe);
router.put("/me", auth, updateMe);

export default router;
