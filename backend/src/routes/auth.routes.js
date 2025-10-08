import { Router } from "express";
import {
  getUsers,
  loginUser,
  registerUser,
} from "../controllers/users.controller.js";
import { verifyToken } from "../controllers/verify.controller.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", verifyToken, getUsers);

export default router;
