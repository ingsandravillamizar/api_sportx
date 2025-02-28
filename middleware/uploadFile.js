import multer from 'multer'
import path from 'path'



// Extensiones permitidas
const allowedExtensions = ['.png', '.jpg', '.jpeg', '.gif'];


const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb){
        const studentId = req.body.identification; 
        if (!studentId) {
            return cb(new Error('Falta identificación del estudiante para el archivo'), null);
        }

        const fileName = `${studentId}${path.extname(file.originalname)}`;
        cb(null, fileName);
    }
})
// Filtro para validar tipos de archivo
const fileFilter = (req, file, cb) => {
    console.log("file",file)
    const allowedExtensions = ['.png', '.jpg', '.jpeg', '.gif'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedExtensions.includes(ext)) {
        cb(null, true);
    } else {
        cb(new Error('Formato de archivo no válido'), false);
    }
};


const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: 5 * 1024 * 1024 // Límite de 5MB
    }
})

export default upload



 
