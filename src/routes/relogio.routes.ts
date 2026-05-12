// src/routes/relogio.routes.ts

import { Router } from "express";

import { createRelogio } from "../controllers/Relogio/createRelogio";
import { getRelogios } from "../controllers/Relogio/getRelogio";
import { getRelogioById } from "../controllers/Relogio/getRelogioById";
import { updateRelogio } from "../controllers/Relogio/updateRelogio";
import { deleteRelogio } from "../controllers/Relogio/deleteRelogio";

const router = Router();

router.post("/", createRelogio);

router.get("/", getRelogios);

router.get("/:id", getRelogioById);

router.put("/:id", updateRelogio);

router.delete("/:id", deleteRelogio);

export default router;