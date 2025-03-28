import { DataTypes } from "sequelize";
import db from "../../../config/db.js";

const categoryInstructor = db.define('categories_instructors', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    order: {
        type: DataTypes.INTEGER,  // Nuevo campo para definir el orden
        allowNull: false,
        defaultValue: 1  // Por defecto, si no se especifica, será el primero
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

export default categoryInstructor;

