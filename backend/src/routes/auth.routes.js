import { Router } from "express";
import {
  getUsers,
  loginUser,
  registerUser,
} from "../controllers/users.controller.js";

const router = Router();

router.post("/register", registerUser);
router.get("/users", getUsers);

router.post("/login", loginUser);

export default router;
