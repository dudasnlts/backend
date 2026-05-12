// src/routes/sale.routes.ts

import { Router } from "express";

import { createSale } from "../controllers/Sale/createSale";
import { getSales } from "../controllers/Sale/getSale";
import { getSaleById } from "../controllers/Sale/getSaleById";
import { updateSale } from "../controllers/Sale/updateSale";
import { deleteSale } from "../controllers/Sale/deleteSale";

const router = Router();

router.post("/", createSale);

router.get("/", getSales);

router.get("/:id", getSaleById);

router.put("/:id", updateSale);

router.delete("/:id", deleteSale);

export default router;