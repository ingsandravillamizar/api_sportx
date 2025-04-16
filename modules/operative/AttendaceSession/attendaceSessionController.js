import { matchedData } from "express-validator";
import { handleHttpError } from "../../../helpers/httperror.js";

import path from 'path'; 
import { promises as fs } from 'fs'; 
import { fileURLToPath } from 'url';
import { attendanceDetail, attendanceSession } from "./attendaceSession.js";

const entity = "attendance_sessions"
// Obtener __dirname equivalente en ES Modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));




const getSessions = async (req, res) =>{
    try {
        const registros = await attendanceSession.findAll({
            where: {state: true},

        });
            // Procesar imágenes en paralelo
            const registrosConImagen = await Promise.all(
                registros.map(async (attendanceSession) => {
                    try {
                        // Construir ruta absoluta (ajusta según tu estructura)
                        const fotoPath = path.join(
                            __dirname, 
                            '..', 
                            '..', 
                            '..', 
                            'public', 
                            attendanceSession.photo
                        );

                        console.log('Ruta completa:', fotoPath);
                        
                        // Verificar y leer archivo
                        await fs.access(fotoPath);
                        const imageBuffer = await fs.readFile(fotoPath);
                        
                        return {
                            ...attendanceSession.toJSON(),
                            photoBase64: `data:image/${path.extname(fotoPath).slice(1)};base64,${imageBuffer.toString('base64')}`
                        };
                    } catch (error) {
                        console.error(`Error en  ${entity} ${attendanceSession.id}:`, error.message);
                        return {
                            ...attendanceSession.toJSON(),
                            photoBase64: null
                        };
                    }
                })
            );
    
            res.json(registrosConImagen);
    } catch (error) {
        console.error(`Error en gets: ${entity}`, error); // Muestra el error en la consola
        handleHttpError(res, `No se pudo cargar ${entity}s`);
    }
}


const getSession = async(req, res) => {
    try {
        req = matchedData(req)
        const { id } = req
        const data = await attendanceSession.findOne({
            where: {
                id: id 
            }
        });


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


const createSession = async (req, res) => {


    console.log('Recibido en el servidor:');
    console.log('Cuerpo de la solicitud:', req.body);
    console.log('Archivos:', req.files);

    

    let transaction;
    try {
        transaction = await db.transaction();
        const body = matchedData(req);

        // 1. Crear sesión principal
        const newSession = await attendanceSession.create({
            ...body,
            evidencePhoto: req.file ? `/uploads/attendances/${req.file.filename}` : null,
        }, { transaction });

        // 2. Crear detalles de asistencia si existen
        if (body.details && Array.isArray(body.details)) {
            const detailsData = body.details.map(detail => ({
                sessionId: newSession.id,
                studentId: detail.studentId,
                attended: detail.attended,
                manualCheck: true
            }));

            await attendanceDetail.bulkCreate(detailsData, { transaction });
        }

        await transaction.commit();
        
        // Obtener la sesión completa con sus detalles
        const fullSession = await attendanceSession.findByPk(newSession.id, {
            include: [attendanceDetail]
        });

        res.status(201).json(fullSession);
    } catch (error) {
        if (transaction) await transaction.rollback();
        console.error(error);
        handleHttpError(res, `No se pudo crear ${entity}`);
    }
}



const updateSession = async (req, res) => {
    let transaction;
    try {
        transaction = await db.transaction();
        const { id } = req.params;
        const { details, ...sessionData } = matchedData(req);

        // 1. Actualizar sesión principal
        const [updatedRows] = await attendanceSession.update(sessionData, {
            where: { id },
            transaction
        });

        if (updatedRows === 0) {
            await transaction.rollback();
            return res.status(404).json({
                message: `${entity} no encontrado`
            });
        }

        // 2. Actualizar detalles (eliminar existentes y crear nuevos)
        if (details && Array.isArray(details)) {
            // Eliminar detalles existentes
            await attendanceDetail.destroy({
                where: { sessionId: id },
                transaction
            });

            // Crear nuevos detalles
            const newDetails = details.map(detail => ({
                sessionId: id,
                studentId: detail.studentId,
                attended: detail.attended,
                manualCheck: detail.manualCheck || true
            }));

            await attendanceDetail.bulkCreate(newDetails, { transaction });
        }

        await transaction.commit();

        // Obtener sesión actualizada con detalles
        const updatedSession = await attendanceSession.findByPk(id, {
            include: [attendanceDetail]
        });

        res.status(200).json({
            message: `${entity} actualizado correctamente`,
            data: updatedSession
        });

    } catch (error) {
        if (transaction) await transaction.rollback();
        console.error("Error detallado:", error);
        handleHttpError(res, `Error al actualizar ${entity}`);
    }
};


const deleteSession = async(req, res) =>{
    try {
        const { id } = req.params
        const response = await attendanceSession.update({state: false}, {
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
    getSessions,
    getSession,
    createSession,
    deleteSession,
    updateSession
}