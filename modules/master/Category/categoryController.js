import { matchedData } from "express-validator";
import { handleHttpError } from "../../../helpers/httperror.js";
import { sequelize, category, instructor } from "../masterRelations.js";
import { categoryInstructor } from "../../operative/operativeRelations.js";
 

const entity = "category"

const getCategories__ = async (req, res) =>{
    try {
        const registros = await category.findAll({
        });
        res.json(registros)
    }catch{
        handleHttpError(res, `No se pudo cargar ${entity} s` ); 
    }
}


const getCategories = async (req, res) => {
    try {
        const registros = await category.findAll({
            include: [
                {
                    model: instructor,
                    through: {
                        attributes: [],
                        where: { order: 1 } // Filtra solo el instructor principal
                    },
                    attributes: ['id', 'name', 'photo'],
                    required: false // Para incluir categorías sin instructor principal
                }
            ]
        });

        // Procesar imágenes en paralelo
        const registrosConInstructor = await Promise.all(
            registros.map(async (categoria) => {
                try {
                    const categoriaJSON = categoria.toJSON();
                    
                    if (categoriaJSON.instructors && categoriaJSON.instructors.length > 0) {
                        const instructorPrincipal = categoriaJSON.instructors[0];
                        
                        if (instructorPrincipal.photo) {
                            const fotoPath = path.join(
                                __dirname, 
                                '..', 
                                '..', 
                                '..', 
                                'public', 
                                instructorPrincipal.photo
                            );

                            await fs.access(fotoPath);
                            const imageBuffer = await fs.readFile(fotoPath);
                            
                            instructorPrincipal.photoBase64 = `data:image/${path.extname(fotoPath).slice(1)};base64,${imageBuffer.toString('base64')}`;
                        }
                    }
                    
                    return categoriaJSON;
                } catch (error) {
                    console.error(`Error procesando categoría ${categoria.id}:`, error.message);
                    return categoria.toJSON();
                }
            })
        );

        res.json(registrosConInstructor);
    } catch (error) {
        console.error("Error en getCategories:", error);
        handleHttpError(res, `No se pudo cargar ${entity}s`);
    }
}


const getActiveCategories = async (req, res) =>{
    try {
        const registros = await category.findAll({
            where: {state: true}
        });
        res.json(registros)
    }catch{
        handleHttpError(res, `No se pudo cargar ${entity} s` ); 
    }
}

const getCategory = async(req, res) => {
    try {
        req = matchedData(req)
        const { id } = req
        const data = await category.findOne({
            where: {
                id: id,
                state: true
            }
        })
        if (!data){
            return res.status(404).json({
                message:  `${entity} no encontrado(a) ó inactivo (a) ` 
            })
        }
        res.status(200).json(data);
        console.log(data)
    } catch (error) {
        handleHttpError(res, `Error al traer ${entity}  ` )
        console.error(error)
    }
}

const createCategory = async (req, res) => {
    try {
        const body = matchedData(req)
        const response = await category.create(body)
        res.send(response)
    } catch (error) {
        console.log(error)
        handleHttpError(res,  `No se pudo crear  ${entity} `)
    }
}


const updateCategory = async (req, res) => {
    try {
        const { id } = req.params

        const body = req.body

        console.log("cuerpo de la solicitud", req.body)


        const response = await category.update(body, {
            where: { id }
        })

        if (response[0] === 0){
            return res.status(404).json({
                message: ` ${entity} No encontrado o No se realizaron cambios ` 
            })
        }

        const updateRegistro = await category.findByPk(id);

        res.status(200).json({
            message:  ` ${entity} actualizado correctamente `  ,
            data: updateRegistro
        }); 
    } catch (error) {
        handleHttpError(res,  `No se pudo actualizar ${entity} `)
        console.error(error)
    }
}

const updateCategory_c = async (req, res) => {
    let transaction;
    
    try {
        // Start a transaction for maintaining data integrity
        transaction = await sequelize.transaction();
        
        const { id } = req.params;
        
        // Extract instructors from body and remove from category data
        const { instructors, ...categoryData } = req.body;
        
        console.log("Cuerpo de la solicitud", req.body);
        
        // Update the category first
        const response = await category.update(categoryData, {
            where: { id },
            transaction
        });
        
        if (response[0] === 0) {
            await transaction.rollback();
            return res.status(404).json({
                message: `${entity} No encontrado o No se realizaron cambios`
            });
        }
        
        // Handle instructors if provided
        if (instructors && Array.isArray(instructors)) {
            // First, delete all existing relationships for this category
            console.log("Deleting existing relationships for categoryId:", id);
            const deleteResult = await categoryInstructor.destroy({
                where: { categoryId: id },
                transaction
            });
            console.log("Delete result:", deleteResult);
            
            // Then create new relationships
            if (instructors.length > 0) {
                const instructorRelations = instructors.map(instructor => ({
                    categoryId: id,
                    instructorId: instructor.instructorId,
                    order: instructor.order || 1,
                    user: req.body.user ,
                    userMod: req.body.user
                }));
                
                console.log("Creating new relationships:", instructorRelations);
                await categoryInstructor.bulkCreate(instructorRelations, { transaction });
            }
        }
        
        // Commit the transaction
        await transaction.commit();
        
        // Get updated category with its instructors
        const updatedCategory = await category.findByPk(id, {
            include: [
                {
                    association: 'instructors',
                    through: { attributes: ['order'] }
                }
            ]
        });
        
        res.status(200).json({
            message: `${entity} actualizado correctamente`,
            data: updatedCategory
        });
        
    } catch (error) {
        // Rollback transaction in case of error
        if (transaction) await transaction.rollback();
        
        handleHttpError(res, `No se pudo actualizar ${entity}`);
        console.error("Detailed error:", error);
    }
};



const deleteCategory = async(req, res) =>{
    try {
        const { id } = req.params
        const response = await category.update({state: false}, {
            where: {id, state: true}
        })

        if(response === 0) {
            return res.status(404).json({
                message: `${entity} , no encontrado(a) y/o inactivo(a)` 
            })
        }

        res.status(200).json({
            message: `${entity} , eliminada con exito` 
        })
    } catch (error) {
        handleHttpError(res, `No se pudo eliminar ${entity} `   )
        console.error(error)
    }
}

export{
    getCategories,
    getCategory,
    createCategory,
    deleteCategory,
    updateCategory,
    updateCategory_c,
    getActiveCategories
}