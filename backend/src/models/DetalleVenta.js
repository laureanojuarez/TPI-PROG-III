import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const DetalleVenta = sequelize.define("detalle_venta", {
  id_evento: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  subtotal: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});
