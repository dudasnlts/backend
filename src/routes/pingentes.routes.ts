// src/routes/pingente.routes.ts

import { Router } from "express";

import { createPingente } from "../controllers/Pingentes/createPingentes";
import { getPingentes } from "../controllers/Pingentes/getPingentes";
import { getPingenteById } from "../controllers/Pingentes/getPingentesById";
import { updatePingente } from "../controllers/Pingentes/updatePingentes";
import { deletePingente } from "../controllers/Pingentes/deletePingentes";

const router = Router();

router.post("/", createPingente);

router.get("/", getPingentes);

router.get("/:id", getPingenteById);

router.put("/:id", updatePingente);

router.delete("/:id", deletePingente);

export default router;