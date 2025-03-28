import { matchedData } from "express-validator";
import { handleHttpError } from "../../../helpers/httperror.js";

import { categoryInstructor } from "../operativeRelations.js";
import { category, instructor } from "../../master/masterRelations.js";


const entity = "categoryInstructor"

const getCatInstructors = async (req, res) =>{
    try {
        const registros = await categoryInstructor.findAll({
        });
        res.json(registros)
    }catch{
        handleHttpError(res, `No se pudo cargar ${entity} s` ); 
    }
}


const getCatInstructor = async (req, res) => {
    try {
        req = matchedData(req);
        const { id } = req;

        const data = await category.findOne({
            where: { id },
            include: [
                {
                    model: instructor,
                    attributes: ['id', 'name'],
                    through: {
                        attributes: ['order'] // Obtener 'order' desde la tabla intermedia
                    }
                }
            ],
            attributes: ['id', 'name', 'description']
        });

        if (!data) {
            return res.status(404).json({
                message: `Categoría no encontrada o inactiva`
            });
        }

        // Reformatear para que 'order' esté en cada instructor
        const formattedData = {
            id: data.id,
            name: data.name,
            description: data.description,
            instructors: data.instructors.map(instructor => ({
                id: instructor.id,
                name: instructor.name,
                order: instructor.categories_instructors.order // Extraer 'order' de la tabla intermedia
            }))
        };

        res.status(200).json(formattedData);
        console.log(formattedData);
    } catch (error) {
        handleHttpError(res, `Error al traer datos`);
        console.error(error);
    }
};

const createCatInstructor = async (req, res) => {
    try {
        const body = matchedData(req)
        const response = await categoryInstructor.create(body)
        res.send(response)
    } catch (error) {
        console.log(error)
        handleHttpError(res,  `No se pudo crear  ${entity} `)
    }
}


const updateCatInstructor = async (req, res) => {
    try {
        const { id } = req.params

        const body = req.body


        const response = await categoryInstructor.update(body, {
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


const deleteCatInstructor = async(req, res) =>{
    try {
        const { id } = req.categoryInstructor
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
    getCatInstructors,
    getCatInstructor,
    createCatInstructor,
    deleteCatInstructor,
    updateCatInstructor 
}