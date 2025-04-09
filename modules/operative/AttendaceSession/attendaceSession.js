import { DataTypes } from "sequelize";
import db from "../../../config/db.js";
import { category } from "../../master/masterRelations.js";

// Modelo principal de sesión de asistencia
const attendanceSession = db.define('attendance_sessions', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    sessionDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    evidencePhoto: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    observation: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    state:{
        type: DataTypes.BOOLEAN, 
        allowNull: false,
        defaultValue: true 
    },

    validated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        comment: 'Para futura validación con IA'
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
    freezeTableName: true
});

// Modelo detalle de asistencia por estudiante
const attendanceDetail = db.define('attendance_details', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    attended: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
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
    indexes: [
        {
            unique: true,
            fields: ['sessionId', 'studentId']
        }
    ]
});



// Relaciones para attendanceSession
attendanceSession.belongsTo(category, {
    foreignKey: 'categoryId',
    as: 'category' // Alias opcional para la relación
});


attendanceSession.hasMany(attendanceDetail, {
    foreignKey: 'sessionId',
    onDelete: 'CASCADE'
});

attendanceDetail.belongsTo(attendanceSession, {
    foreignKey: 'sessionId'
});

attendanceDetail.belongsTo(db.models.students, {
    foreignKey: 'studentId'
});

export { attendanceSession, attendanceDetail };