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
            where: { id }, // Buscamos la categoría por ID
            include: [
                {
                    model: instructor, // Relación con instructores
                    attributes: ['id', 'name'],
                    through: { attributes: [] } // Evita que se muestre la tabla intermedia
                }
            ],
            attributes: ['id', 'name', 'description'] // Atributos de la categoría
        });

        if (!data) {
            return res.status(404).json({
                message: `Categoría no encontrada o inactiva`
            });
        }

        res.status(200).json(data);
        console.log(data);
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