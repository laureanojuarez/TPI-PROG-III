import {
  validateString,
  validateEmail,
  validatePassword,
} from "./validations.js";
import {User} from "../models/User.js";

export const validateUsername = async (username, currentUserId) => {
  if (username.trim() === "") {
    throw new Error("El nombre de usuario no puede estar vacío");
  }
  if (!validateString(username, 3, 30)) {
    throw new Error("El nombre de usuario debe tener entre 3 y 30 caracteres");
  }
  const existUsername = await User.findOne({where: {username}});
  if (existUsername && existUsername.id !== currentUserId) {
    throw new Error("El nombre de usuario ya está en uso");
  }
};

export const validateEmailUpdate = async (email, currentUserId) => {
  if (email.trim() === "") {
    throw new Error("El email no puede estar vacío");
  }
  if (!validateEmail(email)) {
    throw new Error("El email no es válido");
  }
  const existEmail = await User.findOne({where: {email}});
  if (existEmail && existEmail.id !== currentUserId) {
    throw new Error("El email ya está en uso");
  }
};

export const validatePasswordUpdate = (password) => {
  if (password.trim() === "") {
    throw new Error("La contraseña no puede estar vacía");
  }
  if (!validatePassword(password, 7, null, true, true)) {
    throw new Error(
      "La contraseña debe tener al menos 7 caracteres, una mayúscula y un número"
    );
  }
};
