import { DataTypes } from "sequelize";
import db from "../../../config/db.js";

const instructor = db.define('instructors', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    identification: {
        type: DataTypes.STRING(20),
        unique: true,  // La identificación debe ser única
        allowNull: false
    },
    photo: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    bornDate : {
        type: DataTypes.DATE,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    celphone: {
        type: DataTypes.STRING(10)
    },
    
    observation: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    state:{
        type: DataTypes.BOOLEAN, 
        allowNull: false,
        defaultValue: true 
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

export default instructor;

