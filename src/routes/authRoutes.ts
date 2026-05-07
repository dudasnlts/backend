import { Router } from "express";
import { login } from "../controllers/Auth/login";
import { register } from "../controllers/Auth/register";

const router = Router();

router.post("/login", login);
router.post("/register", register); 

export default router;