import { matchedData } from "express-validator";
import { handleHttpError } from "../../../helpers/httperror.js";
import fs from 'fs';
import path from 'path'; 
import { promises as fsPromises } from 'fs';
import { fileURLToPath } from 'url';
import { attendanceDetail, attendanceSession } from "./attendaceSession.js";
import { sequelize } from "../../master/masterRelations.js";


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
    console.log('Tipo de datos details:', typeof req.body.details);
    console.log('Contenido details:', req.body.details);



    let transaction;
    let isFileRenamed = false; // Bandera para rastrear si el archivo fue renombrado

    try {
        transaction = await sequelize.transaction();
        const body = req.body;


        // 1. Parsear detalles si vienen como string (para FormData)
            if (typeof body.details === 'string') {
                try {
                        body.details = JSON.parse(body.details);
                    } catch (error) {
                        throw new Error("Formato inválido en detalles de asistencia");
                    }
                }
        
            if (!Array.isArray(body.details) || !body.details.every(d => 
                    typeof d.studentId === 'number' && 
                    typeof d.attended === 'boolean'
            )) {
                throw new Error("Estructura de detalles inválida");
            }



        //  2. Crear sesión principal con nombre temporal
        const newSession = await attendanceSession.create({
            ...body,
            photo: req.file ? `/uploads/attendances/${req.file.filename}` : null,
            user: body.user, 
            userMod: body.user, 
        }, { transaction });


        // 3. Renombrar archivo con ID real
        if (req.file) {
            const newFilename = `attendance_${newSession.id}${path.extname(req.file.filename)}`;
            const oldPath = path.join('./public/uploads/attendances', req.file.filename);
            const newPath = path.join('./public/uploads/attendances', newFilename);

            await fsPromises.rename(oldPath, newPath);
            isFileRenamed = true; // Marcar como renombrado

            // Actualizar registro con nuevo nombre
            await newSession.update({
                photo: `/uploads/attendances/${newFilename}`
            }, { transaction });
        }


        // 4. Crear detalles de asistencia

        await attendanceDetail.destroy({
            where: { sessionId: id },
            transaction
        });


        const detailsData = body.details.map(detail => ({
            sessionId: newSession.id,
            studentId: detail.studentId,
            attended: detail.attended,
            user: body.user,
            userMod: body.user
        }));

        await attendanceDetail.bulkCreate(detailsData, { transaction });

        // 5. Confirmar transacción ANTES de operaciones no relacionadas
        await transaction.commit();
        
       // 6. Obtener datos actualizados FUERA de la transacción
        const fullSession = await attendanceSession.findByPk(newSession.id, {
            include: [{
                model: attendanceDetail,
                as: 'attendanceDetails'
            }]
        });

        res.status(201).json({
            success: true,
            data: fullSession
        });

    } catch (error) {
        if (transaction && !transaction.finished) {
            await transaction.rollback();
        }
        // Limpiar archivo temporal en caso de error
        if (req.file?.path && !isFileRenamed ) {
            try {
                await fsPromises.unlink(req.file.path);
            } catch (unlinkError) {
                console.error('Error eliminando archivo temporal:', unlinkError);
            }
        }
    
        console.error('Error creating session:', error);
        handleHttpError(res, `Error al crear: ${entity}`);
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