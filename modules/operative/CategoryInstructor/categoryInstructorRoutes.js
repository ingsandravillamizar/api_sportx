import express from 'express';import { apiAuth } from '../../../auth/middleware/apiauth.js';
import { createCatInstructor, deleteCatInstructor, updateCatInstructor, getCatInstructors, getCatInstructor } from './categoryInstructorController.js';
import { validateCreateCategory, validateGetCategory } from './categoryInstructorValidator.js';


//falta arreglar las validaciones...
const router = express.Router();

router.get('/', apiAuth, getCatInstructors)
router.get('/:id', apiAuth, validateGetCategory,  getCatInstructor)
router.post('/create', apiAuth, validateCreateCategory, createCatInstructor)
router.put('/:id', apiAuth,validateGetCategory,  updateCatInstructor)
router.delete('/delete/:id',  apiAuth, deleteCatInstructor)


export default router
