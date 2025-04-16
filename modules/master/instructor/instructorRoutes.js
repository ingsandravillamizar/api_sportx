import express from 'express';import { apiAuth } from '../../../auth/middleware/apiauth.js';
import { createInstructor, deleteInstructor, getInstructor, getInstructors, updateInstructor } from './instructorController.js';
import { validateCreateInstructor, validateGetInstructor } from './instructorValidator.js';
import   { instructorUpload } from '../../../middleware/uploadFile.js';



const router = express.Router();

router.get('/', apiAuth, getInstructors)
router.get('/:id', apiAuth, validateGetInstructor,  getInstructor)
router.post('/create', apiAuth,  instructorUpload.single('image'), validateCreateInstructor,createInstructor)
router.put('/:id', apiAuth,instructorUpload.single('image'), validateGetInstructor,  updateInstructor)
router.delete('/delete/:id',  apiAuth, deleteInstructor)





export default router
