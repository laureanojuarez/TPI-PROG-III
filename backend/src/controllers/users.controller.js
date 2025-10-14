import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validateLoginUser } from "../helpers/validations.js";

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
    where: {
      email,
    },
  });

  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  const comparison = await bcrypt.compare(password, user.password);

  if (!comparison) {
    return res.status(401).json({ message: "Email y/o contraseña incorrecta" });
  }

  const secretKey = "lucasoelschlager";

  const token = jwt.sign({ email }, secretKey, { expiresIn: "1h" });

  res.json(token);
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

export const getMe = async (req, res) => {
  const user = await User.findOne({
    where: { email: req.email },
    attributes: { exclude: ["password"] },
  });
  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }
  res.json(user);
};
