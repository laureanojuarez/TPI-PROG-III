import { Router } from "express";
import {
  getMe,
  getUserById,
  getUsers,
  loginUser,
  registerUser,
  removeAdminRole,
} from "../controllers/users.controller.js";
import { verifyToken } from "../controllers/verify.controller.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", verifyToken, getUsers);
router.get("/users/:id", verifyToken, getUserById);
router.delete("/user/:id", verifyToken, removeAdminRole);
router.get("/me", verifyToken, getMe);
router.get("/me/entradas", verifyToken, getMe);

export default router;
