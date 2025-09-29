import {DataTypes} from "sequelize";
import {sequelize} from "../db.js";

export const EventosUsuarios = sequelize.define("eventos_usuarios", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    sector : {
        type: DataTypes.STRING,
        allowNull: false,
    },  
    fecha_compra: {
        type: DataTypes.DATE,
        allowNull: false,   
        defaultValue: DataTypes.NOW,
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
});