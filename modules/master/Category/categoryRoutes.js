import express from 'express';import { apiAuth } from '../../../auth/middleware/apiauth.js';
import { createCategory, updateCategory_c, deleteCategory, updateCategory, getCategories, getCategory, getCategoriesByInstructor, getActiveCategories } from './categoryController.js';
import { validateCreateCategory, validateGetCategory } from './categoryValidator.js';


//falta arreglar las validaciones...
const router = express.Router();

router.get('/', apiAuth, getCategories)
router.get('/with-instructors', apiAuth, getCategoriesByInstructor)
router.get('/active', apiAuth, getActiveCategories)

router.get('/:id', apiAuth, validateGetCategory,  getCategory)
router.post('/create', apiAuth, validateCreateCategory, createCategory)
router.put('/:id', apiAuth,validateGetCategory,  updateCategory_c)
router.delete('/delete/:id',  apiAuth, deleteCategory)




export default router
