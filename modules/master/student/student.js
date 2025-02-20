import { DataTypes } from "sequelize";
import db from "../../../config/db.js";

const student = db.define('students', {
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
    acudientIdentification: {
        type: DataTypes.INTEGER,
    },
    acudientName: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    acudientCelphone: {
        type: DataTypes.STRING(10)
    },
    acudientSignature: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    fatherName: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    fatherCelphone: {
        type: DataTypes.STRING(10),
        allowNull: true,
    },
    motherName: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    motherCelphone: {
        type: DataTypes.STRING(10),
        allowNull: true
    },
    jerseyNumber: {
        type: DataTypes.STRING(3),
        allowNull: true
    },
    jerseyName: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    jerseySize: {
        type: DataTypes.STRING(3),
        allowNull: false
    },
    medicalInsurance: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    bloodType: {
        type: DataTypes.STRING(4),
        allowNull: false
    },
    medicalConditions: {
        type: DataTypes.STRING(255),
        allowNull: false
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
    consent :{
        type: DataTypes.BOOLEAN, 
        allowNull: false,
        defaultValue: true 
    },
    data_privacy :{
        type: DataTypes.BOOLEAN, 
        allowNull: false,
        defaultValue: true 
    },
    confirmed :{
        type: DataTypes.BOOLEAN, 
        defaultValue: false 
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

export default student;

