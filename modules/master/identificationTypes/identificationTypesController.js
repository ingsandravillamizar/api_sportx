import { matchedData } from "express-validator";
import { handleHttpError } from "../../../helpers/httperror.js";
import identificationType from "./identificationTypes.js";

const entity = "identificationType"

const getIdentificationTypes = async (req, res) =>{
    try {
        const registros = await identificationType.findAll({
            where: {state: true}
        });
        res.json(registros)
    }catch{
        handleHttpError(res, `No se pudo cargar ${entity} s` ); 
    }
}

const getIdentificationType = async(req, res) => {
    try {
        req = matchedData(req)
        const { id } = req
        const data = await identificationType.findOne({
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

const createIdentificationType = async (req, res) => {
    try {
        const body = matchedData(req)
        const response = await identificationType.create(body)
        res.send(response)
    } catch (error) {
        console.log(error)
        handleHttpError(res,  `No se pudo crear  ${entity} `)
    }
}

const deleteIdentificationType = async(req, res) =>{
    try {
        const { id } = req.params
        const response = await identificationType.update({state: false}, {
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

const updateIdentificationType = async (req, res) => {
    try {
        const { id } = req.params

        const body = req.body
        //console.log('Banco', id)

        const response = await identificationType.update(body, {
            where: { id }
        })

        if (response[0] === 0){
            return res.status(404).json({
                message: ` ${entity} No encontrado o No se realizaron cambios ` 
            })
        }

        const updateRegistro = await identificationType.findByPk(id);

        res.status(200).json({
            message:  ` ${entity} actualizado correctamente `  ,
            data: updateRegistro
        }); 
    } catch (error) {
        handleHttpError(res,  `No se pudo actuaizar ${entity} `)
        console.error(error)
    }
}

export{
    getIdentificationTypes,
    getIdentificationType,
    createIdentificationType,
    deleteIdentificationType,
    updateIdentificationType
}