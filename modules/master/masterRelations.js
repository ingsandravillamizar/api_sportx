import position from "./position/position";
import positionCategory from "./positionCategory/positionCategory";



/** La categoria de posiciones tienen muchas posiciones
 *  Una posicion pertenece a una categoria de posiciones
 */
 
positionCategory.hasMany(position, { foreignKey: 'positionCategoryId' });
position.belongsTo(positionCategory, { foreignKey: "positionCategoryId" });


export{
    positionCategory,
    position
}