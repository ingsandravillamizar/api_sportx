import express from 'express';import { apiAuth } from '../../../auth/middleware/apiauth.js';
import { createCategory, deleteCategory, updateCategory, getCategories, getCategory } from './categoryController.js';
import { validateCreatePositionCategory, validateGetPositionCategory } from './positionCategoryValidator.js';


//falta arreglar las validaciones...
const router = express.Router();

router.get('/', apiAuth, getPositionCategories)
router.get('/:id', apiAuth, validateGetPositionCategory,  gettPositionCategory)
router.post('/create', apiAuth, validateCreatePositionCategory, createtPositionCategory)
router.put('/:id', apiAuth,validateGetPositionCategory,  updatetPositionCategory)
router.delete('/delete/:id',  apiAuth, deletetPositionCategory)


// hola

export default router
