import { matchedData } from "express-validator";
import { handleHttpError } from "../../../helpers/httperror.js";
import { season } from "../masterRelations.js";


const entity = "season"

const getSeasons = async (req, res) =>{
    try {
        const registros = await season.findAll({

        });
        res.json(registros)
    }catch{
        handleHttpError(res, `No se pudo cargar ${entity} s` ); 
    }
}

const getSeason = async(req, res) => {
    try {
        req = matchedData(req)
        const { id } = req
        const data = await season.findOne({
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

const createSeason = async (req, res) => {
    try {
        const body = matchedData(req)
        const response = await season.create(body)
        res.send(response)
    } catch (error) {
        console.log(error)
        handleHttpError(res,  `No se pudo crear  ${entity} `)
    }
}


const updateSeason = async (req, res) => {
    try {
        const { id } = req.params

        const body = req.body


        const response = await season.update(body, {
            where: { id }
        })

        if (response[0] === 0){
            return res.status(404).json({
                message: ` ${entity} No encontrado o No se realizaron cambios ` 
            })
        }

        const updateRegistro = await season.findByPk(id);

        res.status(200).json({
            message:  ` ${entity} actualizado correctamente `  ,
            data: updateRegistro
        }); 
    } catch (error) {
        handleHttpError(res,  `No se pudo actualizar ${entity} `)
        console.error(error)
    }
}


const deleteSeason = async(req, res) =>{
    try {
        const { id } = req.params
        const response = await season.update({state: false}, {
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
    getSeasons,
    getSeason,
    createSeason,
    deleteSeason,
    updateSeason
}