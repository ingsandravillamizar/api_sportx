import express from 'express';import { apiAuth } from '../../../auth/middleware/apiauth.js';
import { createStudent, deleteStudent, updateStudent, getStudents, getStudent, getStudentsByCategory } from './studentController.js';
import { validateCreateStudent, validateGetStudent } from './studentValidator.js';
import  { studentUpload } from '../../../middleware/uploadFile.js';


const router = express.Router();

router.get('/', apiAuth, getStudents)
router.get('/category/:categoryId',apiAuth, getStudentsByCategory);
router.get('/:id', apiAuth, validateGetStudent,  getStudent)



router.post('/create', apiAuth,  studentUpload.single('image'), validateCreateStudent,createStudent)
router.put('/:id', apiAuth,studentUpload.single('image'), validateGetStudent,  updateStudent)
router.delete('/delete/:id',  apiAuth, deleteStudent)




export default router
