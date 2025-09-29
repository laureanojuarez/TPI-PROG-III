import {DataTypes} from "sequelize";
import {sequelize} from "../db.js";

const Pagos = sequelize.define("pagos", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,   
        autoIncrement: true,
    },
    monto: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,   
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,   
        defaultValue: DataTypes.NOW,
    },
    metodo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});