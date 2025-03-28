import { instructor } from "../master/masterRelations.js";
import { category } from "../master/masterRelations.js";
import categoryInstructor from "./CategoryInstructor/categoryInstructor.js";

category.belongsToMany(instructor, { through: categoryInstructor, foreignKey: 'categoryId' });
instructor.belongsToMany(category, { through: categoryInstructor, foreignKey: 'instructorId' });


export{
    categoryInstructor
}