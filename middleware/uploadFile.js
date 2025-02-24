import multer from 'multer'
import path from 'path'



// Extensiones permitidas
const allowedExtensions = ['.png', '.jpg', '.jpeg', '.gif'];


const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb){
        const studentId = req.body.identification; 
        const fileName = `${studentId}${path.extname(file.originalname)}`;
        cb(null, fileName);
    }
})

const upload = multer({storage})

export default upload



 
