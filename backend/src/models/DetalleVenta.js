import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const DetalleVenta = sequelize.define("detalle_venta", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
