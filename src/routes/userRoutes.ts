import { Router } from "express";
import { createUser } from "../controllers/Users/createUser";
import { deleteUser } from "../controllers/Users/deleteUser";
import { getUserById } from "../controllers/Users/getUserById";
import { getUsers } from "../controllers/Users/getUsers";
import { updateUser } from "../controllers/Users/updateUser";

const router = Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;