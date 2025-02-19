import position from "./position/position.js";
import positionCategory from "./positionCategory/positionCategory.js";


import student from "./student/student.js";
import identificationType from "./identificationType/identificationTypes.js";
import category from "./category/category.js";
import club from "./club/club.js";


/** La categoria de posiciones tienen muchas posiciones
 *  Una posicion pertenece a una categoria de posiciones
 */

positionCategory.hasMany(position, { foreignKey: 'positionCategoryId' });
position.belongsTo(positionCategory, { foreignKey: "positionCategoryId" });


/** Relación: Estudiantes y Tipo de Identificación */
identificationType.hasMany(student, { foreignKey: "identificationTypeId" });
student.belongsTo(identificationType, { foreignKey: "identificationTypeId" });

/** Relación: Estudiantes y Categoría */
category.hasMany(student, { foreignKey: "categoryId" });
student.belongsTo(category, { foreignKey: "categoryId" });

/** Relación: Estudiantes y Club de Origen */
club.hasMany(student, { foreignKey: "clubId" });
student.belongsTo(club, { foreignKey: "clubId" });

/** Relación: Estudiantes y Posición */
position.hasMany(student, { foreignKey: "positionId" });
student.belongsTo(position, { foreignKey: "positionId" });


export{
    positionCategory,
    position,
    student,
    identificationType,
    category,
    club
}