import express from 'express';import { apiAuth } from '../../../auth/middleware/apiauth.js';
import { createCatInstructor, deleteCatInstructor, updateCatInstructor, getCatInstructors, getCatInstructor } from './categoryInstructorController.js';
import { validateCreateCatInstructor, validateGetCatInstructor } from './categoryInstructorValidator.js';


//falta arreglar las validaciones...
const router = express.Router();

router.get('/', apiAuth, getCatInstructors)
router.get('/:id', apiAuth, validateGetCatInstructor,  getCatInstructor)
router.post('/create', apiAuth, validateCreateCatInstructor, createCatInstructor)
router.put('/:id', apiAuth,validateGetCatInstructor,  updateCatInstructor)
router.delete('/delete/:id',  apiAuth, deleteCatInstructor)


export default router
