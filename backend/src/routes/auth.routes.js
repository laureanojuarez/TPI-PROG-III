import {Router} from "express";
import {
  changeProfile,
  getMe,
  getUserById,
  getUsers,
  loginUser,
  registerUser,
  removeAdminRole,
  setAdminRole,
  changePassword,
} from "../controllers/users.controller.js";
import {verifyToken} from "../controllers/verify.controller.js";

const router = Router();

router.post("/register", registerUser); // Registrar nuevo usuario
router.post("/login", loginUser); // Iniciar sesión de usuario

router.get("/me", verifyToken, getMe); // Obtener datos del usuario autenticado
router.get("/me/entradas", verifyToken, getMe); // Obtener entradas del usuario autenticado

router.get("/users", verifyToken, getUsers); // Obtener todos los usuarios
router.get("/users/:id", verifyToken, getUserById); // Obtener usuario por ID

router.delete("/user/:id/admin", verifyToken, removeAdminRole); // Eliminar rol de administrador
router.put("/user/:id/admin", verifyToken, setAdminRole); // Asignar rol de administrador

router.put("/user/:id", verifyToken, changeProfile); // Actualizar perfil de usuario
router.put("/user/:id/password", verifyToken, changePassword); // Cambiar contraseña de usuario

export default router;
