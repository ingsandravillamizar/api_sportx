import express from 'express';import { apiAuth } from '../../../auth/middleware/apiauth.js';
import { createStudent, deleteStudent, updateStudent, getStudents, getStudent } from './studentController.js';
import { validateCreateStudent, validateGetStudent } from './studentValidator.js';
import upload from '../../../middleware/uploadFile.js';


const router = express.Router();

router.get('/', apiAuth, getStudents)
router.get('/:id', apiAuth, validateGetStudent,  getStudent)
router.post('/create', apiAuth,  upload.single('image'), validateCreateStudent,createStudent)
router.put('/:id', apiAuth,upload.single('image'), validateGetStudent,  updateStudent)
router.delete('/delete/:id',  apiAuth, deleteStudent)

//Carga de Imagenes



export default router
