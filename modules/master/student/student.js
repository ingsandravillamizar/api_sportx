import { DataTypes } from "sequelize";
import db from "../../../config/db.js";

// Función helper reutilizable
const uppercaseTrim = (value) => {
    if (typeof value === 'string') {
        return value.toUpperCase().trim();
    }
    return value;
};


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
        allowNull: false,
        set(value) {
            this.setDataValue('name', uppercaseTrim(value));
        }
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
        allowNull: false,
        set(value) {
            this.setDataValue('acudientName', uppercaseTrim(value));
        }
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
        allowNull: true,
        set(value) {
            this.setDataValue('fatherName', uppercaseTrim(value));
        }
    },
    motherCelphone: {
        type: DataTypes.STRING(10),
        allowNull: true,
        set(value) {
            this.setDataValue('motherName', uppercaseTrim(value));
        }
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
        type: DataTypes.STRING(),
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
    freezeTableName: true,
    hooks: {
        beforeValidate: (student) => {
            // Asegurar formato para actualizaciones parciales
            const fieldsToFormat = [
                'name',
                'acudientName',
                'fatherName',
                'motherName',
                'jerseyName'
            ];
            
            fieldsToFormat.forEach(field => {
                if (student[field]) {
                    student[field] = uppercaseTrim(student[field]);
                }
            });
        }
    }
});



export default student;

