import express from 'express';import { apiAuth } from '../../../auth/middleware/apiauth.js';
import { createPositionCategory, deletePositionCategory, updatePositionCategory, getPositionCategories, getPositionCategory } from './positionCategoryController.js';
import { validateCreatePositionCategory, validateGetPositionCategory } from './positionCategoryValidator.js';


const router = express.Router();

router.get('/', apiAuth, getPositionCategories)
router.get('/:id', apiAuth, validateGetPositionCategory,  getPositionCategory)
router.post('/create', apiAuth, validateCreatePositionCategory, createPositionCategory)
router.put('/:id', apiAuth,validateGetPositionCategory,  updatePositionCategory)
router.delete('/delete/:id',  apiAuth, deletePositionCategory)



export default router
