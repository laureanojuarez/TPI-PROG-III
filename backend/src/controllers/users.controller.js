import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validateLoginUser } from "../helpers/validations.js";
import { DetalleVenta } from "../models/DetalleVenta.js";
import { Evento } from "../models/Evento.js";

export const registerUser = async (req, res) => {
  const { username, email, password, age, role } = req.body;

  const user = await User.findOne({
    where: {
      email: email,
    },
  });

  if (user) {
    return res.status(400).json({ message: "El usuario ya existe" });
  }

  const saltRounds = 10;

  const salt = await bcrypt.genSalt(saltRounds);

  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
    age,
    role,
  });

  res.json(newUser.id);
};

export const getUsers = async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ["password"] },
  });
  res.json(users);
};

export const loginUser = async (req, res) => {
  const result = validateLoginUser(req.body);

  if (result.error) {
    return res.status(400).send({ message: result.message });
  }

  const { email, password } = req.body;

  const user = await User.findOne({
    where: { email },
  });

  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  const comparison = await bcrypt.compare(password, user.password);

  if (!comparison) {
    return res.status(401).json({ message: "Email y/o contraseña incorrecta" });
  }

  const secretKey = "lucasoelschlager";
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    secretKey,
    { expiresIn: "1h" }
  );

  return res.json(token);
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }
  res.json(user);
};

export const removeAdminRole = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  try {
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    user.role = "user";
    await user.save();
    res.json({ message: "Rol de administrador removido" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al remover rol de administrador" });
  }
};

export const getMe = async (req, res) => {
  const user = await User.findOne({
    where: { email: req.email },
    attributes: { exclude: ["password"] },
    include: [
      {
        model: DetalleVenta,
        include: [
          {
            model: Evento,
            attributes: ["id", "name", "date", "location", "artist", "poster"],
          },
        ],
      },
    ],
  });
  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }
  res.json(user);
};

export const changeProfile = async (req, res) => {
  const { id } = req.params;
  const { username, email, age } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (username !== undefined) {
      user.username = username;
    }

    if (email !== undefined) {
      user.email = email;
    }
    if (age <= 18) {
      return res
        .status(400)
        .json({ message: "La edad debe ser mayor a 18 años" });
    }

    if (age !== undefined) {
      user.age = age;
    }

    await user.save();
    res.json({ message: "Perfil actualizado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el perfil" });
  }
};
