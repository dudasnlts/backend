import { Router } from "express";

import { createJoia } from "../controllers/Joias/createJoia";
import { getJoias } from "../controllers/Joias/getJoias";
import { getJoiaById } from "../controllers/Joias/getJoiaById";
import { updateJoia } from "../controllers/Joias/updateJoia";
import { deleteJoia } from "../controllers/Joias/deleteJoia";

const router = Router();

router.post("/", createJoia);

router.get("/", getJoias);

router.get("/:id", getJoiaById);

router.put("/:id", updateJoia);

router.delete("/:id", deleteJoia);

export default router;