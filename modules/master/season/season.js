import { DataTypes } from "sequelize";
import db from "../../../config/db.js";

const season = db.define('seasons', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    startDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    enrollmentFee: {  
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    monthlyFee: {  
        type: DataTypes.DECIMAL(10,2),
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

export default season;

