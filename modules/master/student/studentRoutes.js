import express from 'express';import { apiAuth } from '../../../auth/middleware/apiauth.js';
import { createStudent, deleteStudent, updateStudent, getStudents, getStudent } from './studentController.js';
import { validateCreateStudent, validateGetStudent } from './studentValidator.js';



const router = express.Router();

router.get('/', apiAuth, getStudents)
router.get('/:id', apiAuth, validateGetStudent,  getStudent)
router.post('/create', apiAuth, validateCreateStudent, createStudent)
router.put('/:id', apiAuth,validateGetStudent,  updateStudent)
router.delete('/delete/:id',  apiAuth, deleteStudent)




export default router
