import { DataTypes } from "sequelize";
import db from "../../../config/db.js";

const company = db.define('companies', {
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
    logo: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    slogan: {
        type: DataTypes.STRING(200),
        allowNull: false
    },

    observation: {
        type: DataTypes.STRING(200),
        allowNull: false
    },

    address: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    celphone: {
        type: DataTypes.STRING(10)
    },
    ownerIdentification: {
        type: DataTypes.STRING(15)
    },
    ownerName: {
        type: DataTypes.STRING(100),
        allowNull: false
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

export default company;

