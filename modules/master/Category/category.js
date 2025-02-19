import { DataTypes } from "sequelize";
import db from "../../../config/db.js";

const category = db.define('categories', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    code: {
        type: DataTypes.STRING(2),
        allowNull: false
    },

    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    state:{
        type: DataTypes.BOOLEAN, 
        allowNull: false,
        defaultValue: 1 
    },
    user: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    userMod: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
},
{
    timestamps: true,
    freezeTableName: true // Evita que Sequelize pluralice el nombre de la tabla
});

export default category;