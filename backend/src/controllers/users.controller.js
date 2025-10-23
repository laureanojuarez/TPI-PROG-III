import {User} from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  validateEmail,
  validateLoginUser,
  validatePassword,
  validateString,
} from "../helpers/validations.js";
import {DetalleVenta} from "../models/DetalleVenta.js";
import {Evento} from "../models/Evento.js";
import {
  validateEmailUpdate,
  validatePasswordUpdate,
  validateUsername,
} from "../helpers/userValidations.js";

export const registerUser = async (req, res) => {
  const {username, email, password, age, role} = req.body;

  const user = await User.findOne({
    where: {
      email: email,
    },
  });

  if (user) {
    return res.status(400).json({message: "El usuario ya existe"});
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
    attributes: {exclude: ["password"]},
  });
  res.json(users);
};

export const loginUser = async (req, res) => {
  const result = validateLoginUser(req.body);

  if (result.error) {
    return res.status(400).send({message: result.message});
  }

  const {email, password} = req.body;

  const user = await User.findOne({
    where: {email},
  });

  if (!user) {
    return res.status(404).json({message: "Usuario no encontrado"});
  }

  const comparison = await bcrypt.compare(password, user.password);

  if (!comparison) {
    return res.status(401).json({message: "Email y/o contraseña incorrecta"});
  }

  const secretKey = "lucasoelschlager";
  const token = jwt.sign(
    {id: user.id, email: user.email, role: user.role},
    secretKey,
    {expiresIn: "1h"}
  );

  return res.json(token);
};

export const getUserById = async (req, res) => {
  const {id} = req.params;
  const user = await User.findByPk(id, {
    attributes: {exclude: ["password"]},
  });
  if (!user) {
    return res.status(404).json({message: "Usuario no encontrado"});
  }
  res.json(user);
};

export const removeAdminRole = async (req, res) => {
  const {id} = req.params;
  const user = await User.findByPk(id);
  try {
    if (!user) {
      return res.status(404).json({message: "Usuario no encontrado"});
    }
    user.role = "user";
    await user.save();
    res.json({message: "Rol de administrador removido"});
  } catch (err) {
    console.error(err);
    res.status(500).json({message: "Error al remover rol de administrador"});
  }
};

export const setAdminRole = async (req, res) => {
  const {id} = req.params;
  const user = await User.findByPk(id);
  try {
    if (!user) {
      return res.status(404).json({message: "Usuario no encontrado"});
    }
    user.role = "admin";
    await user.save();
    res.json({message: "Rol de administrador asignado"});
  } catch (err) {
    console.error(err);
    res.status(500).json({message: "Error al asignar rol de administrador"});
  }
};

export const getMe = async (req, res) => {
  const user = await User.findOne({
    where: {email: req.email},
    attributes: {exclude: ["password"]},
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
    return res.status(404).json({message: "Usuario no encontrado"});
  }
  res.json(user);
};

export const changeProfile = async (req, res) => {
  const {id} = req.params;
  const {username, email, password} = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({message: "Usuario no encontrado"});
    }

    if (username !== undefined && username !== user.username) {
      await validateUsername(username, user.id);
      user.username = username;
    }

    if (email !== undefined && email !== user.email) {
      await validateEmailUpdate(email, user.id);
      user.email = email;
    }

    if (password !== undefined) {
      validatePasswordUpdate(password);
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();
    res.json({message: "Perfil actualizado"});
  } catch (error) {
    console.error(error);
    res.status(400).json({message: error.message});
  }
};

export const changePassword = async (req, res) => {
  const {id} = req.params;
  const {current, newPass} = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({message: "Usuario no encontrado"});

    const isMatch = await bcrypt.compare(current, user.password);
    if (!isMatch)
      return res
        .status(401)
        .json({message: "La contraseña actual es incorrecta"});

    if (!validatePassword(newPass, 7, null, true, true)) {
      return res.status(400).json({
        message:
          "La nueva contraseña debe tener al menos 7 caracteres, una letra mayúscula y un número",
      });
    }

    user.password = await bcrypt.hash(newPass, 10);
    await user.save();

    res.json({message: "Contraseña actualizada correctamente"});
  } catch (error) {
    res.status(500).json({message: "Error al cambiar la contraseña"});
  }
};
