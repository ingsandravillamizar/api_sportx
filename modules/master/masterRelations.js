import position from "./position/position.js";
import positionCategory from "./positionCategory/positionCategory.js";



/** La categoria de posiciones tienen muchas posiciones
 *  Una posicion pertenece a una categoria de posiciones
 */
 
positionCategory.hasMany(position, { foreignKey: 'positionCategoryId' });
position.belongsTo(positionCategory, { foreignKey: "positionCategoryId" });


export{
    positionCategory,
    position
}