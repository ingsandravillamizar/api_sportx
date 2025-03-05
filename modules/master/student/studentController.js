import { matchedData } from "express-validator";
import { handleHttpError } from "../../../helpers/httperror.js";
import { student,identificationType,category,club,position } from "../masterRelations.js";


const entity = "student"

// Función para detectar tipo MIME
function getMimeType(filePath) {
    const extension = path.extname(filePath).toLowerCase();
    const mimeTypes = {
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.gif': 'image/gif'
    };
    return mimeTypes[extension] || 'application/octet-stream';
}


const getStudents = async (req, res) =>{
    try {
        const registros = await student.findAll({
            where: {state: true},
            include: [
                {
                    model: identificationType,
                    attributes: ["id", "name"]
                },
                {
                    model: category,
                    attributes: ["id", "name"]
                },
                {
                    model: club,
                    attributes: ["id", "name"]
                },
                {
                    model: position,
                    attributes: ["id", "name"]
                }
            ]
        });
            // Procesar imágenes en paralelo
            const registrosConImagen = await Promise.all(
                registros.map(async (estudiante) => {
                    try {
                        const fotoPath = path.join(__dirname, '..', 'public', estudiante.photo);
                        const imageBuffer = await fs.readFile(fotoPath);
                        const base64Image = imageBuffer.toString('base64');
                        const mimeType = getMimeType(fotoPath); // Función para detectar tipo MIME
                        
                        return {
                            ...estudiante.toJSON(),
                            photoBase64: `data:${mimeType};base64,${base64Image}`
                        };
                    } catch (error) {
                        console.error(`Error procesando imagen para ${estudiante.identification}:`, error);
                        return {
                            ...estudiante.toJSON(),
                            photoBase64: null
                        };
                    }
                })
            );
    
            res.json(registrosConImagen);
    } catch (error) {
        console.error("Error en getStudents:", error); // Muestra el error en la consola
        handleHttpError(res, `No se pudo cargar ${entity}s`);
    }
}


const getStudent = async(req, res) => {
    try {
        req = matchedData(req)
        const { id } = req
        const data = await student.findOne({
            where: {
                id: id,
                state: true
            },
            include: [
                {
                    model: identificationType,
                    attributes: ["id", "name"]
                },
                {
                    model: category,
                    attributes: ["id", "name"]
                },
                {
                    model: club,
                    attributes: ["id", "name"]
                },
                {
                    model: position,
                    attributes: ["id", "name"]
                }
            ]
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

const createStudent = async (req, res) => {


    console.log('Recibido en el servidor:');
    console.log('Cuerpo de la solicitud:', req.body);
    console.log('Archivos:', req.files);


    try {
        const body = matchedData(req)

        // Verificar si hay un archivo de imagen y obtener su ruta
        const photoPath = req.file ? `/uploads/${req.file.filename}` : null;

        const response = await student.create({
            ...body,
            photo: photoPath, // Guardar la ruta en la BD
        });
        res.send(response)
    } catch (error) {
        console.log(error)
        handleHttpError(res,  `No se pudo crear . ${entity} `)
    }
}


const updateStudent = async (req, res) => {


    console.log('Recibido en el servidor:');
    console.log('Cuerpo de la solicitud:', req.body);
    console.log('Archivos:', req.files);


    try {
        const { id } = req.params
        const body = req.body

        // Verificar si hay un archivo de imagen nuevo y obtener su ruta
        if (req.file) {
            body.photo = `/uploads/${req.file.filename}`;
        }
        

        const response = await student.update(body, {
            where: { id }
        })

        if (response[0] === 0){
            return res.status(404).json({
                message: ` ${entity} No encontrado o No se realizaron cambios ` 
            })
        }

        const updateRegistro = await student.findByPk(id);

        res.status(200).json({
            message:  ` ${entity} actualizado correctamente `  ,
            data: updateRegistro
        }); 
    } catch (error) {
        handleHttpError(res,  `No se pudo actualizar ${entity} `)
        console.error(error)
    }
}


const deleteStudent = async(req, res) =>{
    try {
        const { id } = req.params
        const response = await student.update({state: false}, {
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
    getStudents,
    getStudent,
    createStudent,
    deleteStudent,
    updateStudent
}