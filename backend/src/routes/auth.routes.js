import {Router} from "express";
import {
  getUsers,
  loginUser,
  registerUser,
} from "../controllers/users.controller.js";
import {verifyToken} from "../controllers/verify.controller.js";

const router = Router();

router.post("/register", verifyToken, registerUser);
router.get("/users", verifyToken, getUsers);

router.post("/login", loginUser);

export default router;
