import { Router } from "express";

// controllers
import { createProduct } from "../controllers/Products/createProduct";
import { getProducts } from "../controllers/Products/getProducts";
import { getProductById } from "../controllers/Products/getProductById";
import { updateProduct } from "../controllers/Products/updateProducts";
import { deleteProduct } from "../controllers/Products/deleteProducts";

// middlewares
import { auth } from "../middlewares/auth";
import { isAdmin } from "../middlewares/isAdmin";

// multer
import upload from "../config/multer";

const router = Router();

// PUBLIC

router.get("/", getProducts);

router.get("/:id", getProductById);

// ADMIN

router.post(
  "/",
  auth,
  isAdmin,
  upload.single("image"),
  createProduct
);

router.put(
  "/:id",
  auth,
  isAdmin,
  upload.single("image"),
  updateProduct
);

router.delete(
  "/:id",
  auth,
  isAdmin,
  deleteProduct
);

export default router;