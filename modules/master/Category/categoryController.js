import { matchedData } from "express-validator";
import { handleHttpError } from "../../../helpers/httperror.js";
import { category}  from "../masterRelations.js";


const entity = "category"

const getCategories = async (req, res) =>{
    try {
        const registros = await category.findAll({
        });
        res.json(registros)
    }catch{
        handleHttpError(res, `No se pudo cargar ${entity} s` ); 
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
    getActiveCategories
}