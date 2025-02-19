import express from 'express';import { apiAuth } from '../../../auth/middleware/apiauth.js';
import { createCategory, deleteCategory, updateCategory, getCategories, getCategory } from './categoryController.js';
import { validateCreateCategory, validateGetCategory } from './categoryValidator.js';


//falta arreglar las validaciones...
const router = express.Router();

router.get('/', apiAuth, getCategories)
router.get('/:id', apiAuth, validateGetCategory,  getCategory)
router.post('/create', apiAuth, validateCreateCategory, createCategory)
router.put('/:id', apiAuth,validateGetCategory,  updateCategory)
router.delete('/delete/:id',  apiAuth, deleteCategory)


// hola

export default router
