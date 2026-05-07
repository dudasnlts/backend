import { Router } from "express";
import { createCategory } from "../controllers/Category/createCategory";
import { deleteCategory } from "../controllers/Category/deleteCategory";
import { getCategories } from "../controllers/Category/getCategories";
import { getCategoryById } from "../controllers/Category/getCategoryById";
import { updateCategory } from "../controllers/Category/updateCategory";


const router = Router();

// 🔥 CRUD Category
router.post("/", createCategory);
router.get("/", getCategories);
router.get("/:id", getCategoryById);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;