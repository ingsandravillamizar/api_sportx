import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid'; 




// Configuración base
const allowedExtensions = ['.png', '.jpg', '.jpeg', '.gif'];
const maxFileSize = 5 * 1024 * 1024; // 5MB

// Función generadora de configuración de almacenamiento
const createStorage = (entityType, idField = 'identification', prefix) => multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join('./public/uploads', entityType);
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const entityId = req.body[idField];
        
        if (!entityId) {
        return cb(new Error(`Falta el campo ${idField} para ${entityType}`), null);
        }

        const ext = path.extname(file.originalname).toLowerCase();
        const fileName = `${entityId}${ext}`;
        
        cb(null, fileName);
    }
});

// Middlewares específicos para cada entidad
const studentUpload = multer({
    storage: createStorage('students', 'identification', 'student'),
    fileFilter: (req, file, cb) => fileFilter(file, cb),
    limits: { fileSize: maxFileSize }
});

const instructorUpload = multer({
    storage: createStorage('instructors', 'identification', 'instructor'),
    fileFilter: (req, file, cb) => fileFilter(file, cb),
    limits: { fileSize: maxFileSize }
});

const companyUpload = multer({
    storage: createStorage('companies', 'identification', 'company'),
    fileFilter: (req, file, cb) => fileFilter(file, cb),
    limits: { fileSize: maxFileSize }
});

// const attendanceUpload = multer({
    
//     storage: createStorage('attendances', 'id', 'attendance'),
//     fileFilter: (req, file, cb) => fileFilter(file, cb),
//     limits: { fileSize: maxFileSize }
// });



const attendanceStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join('./public/uploads', 'attendances');
        fs.mkdirSync(uploadPath, { recursive: true }); // Crea directorio si no existe
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const tempId = uuidv4(); // Generar UUID temporal
        req.tempFileId = tempId; // Guardar en el request para usar después
        const ext = path.extname(file.originalname);
        cb(null, `temp_${tempId}${ext}`); // Nombre temporal
    }
});

const attendanceUpload = multer({
    storage: attendanceStorage,
    fileFilter: (req, file, cb) => fileFilter(file, cb),
    limits: { fileSize: maxFileSize }
});

// Filtro de archivos reutilizable
const fileFilter = (file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    allowedExtensions.includes(ext) 
        ? cb(null, true) 
        : cb(new Error('Formato de archivo no válido. Solo se permiten: ' + allowedExtensions.join(', ')), false);
};

export {
    studentUpload,
    instructorUpload,
    companyUpload,
    attendanceUpload
};