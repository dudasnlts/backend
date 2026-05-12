// src/routes/perfume.routes.ts

import { Router } from "express";

import { createPerfume } from "../controllers/Perfume/createPerfume";
import { getPerfumes } from "../controllers/Perfume/getPerfume";
import { getPerfumeById } from "../controllers/Perfume/getPerfumeById";
import { updatePerfume } from "../controllers/Perfume/updatePerfume";
import { deletePerfume } from "../controllers/Perfume/deletePerfume";

const router = Router();

router.post("/", createPerfume);

router.get("/", getPerfumes);

router.get("/:id", getPerfumeById);

router.put("/:id", updatePerfume);

router.delete("/:id", deletePerfume);

export default router;