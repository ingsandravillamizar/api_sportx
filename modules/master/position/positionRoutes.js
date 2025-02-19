import express from 'express';import { apiAuth } from '../../../auth/middleware/apiauth.js';
import { createPosition, deletePosition, updatePosition, getPositions, getPosition } from './positonController.js';
import { validateCreatePosition, validateGetPosition } from './positionValidator.js';


//falta arreglar las validaciones...
const router = express.Router();

router.get('/', apiAuth, getPositions)
router.get('/:id', apiAuth, validateGetPosition,  getPosition)
router.post('/create', apiAuth, validateCreatePosition, createPosition)
router.put('/:id', apiAuth,validateGetPosition,  updatePosition)
router.delete('/delete/:id',  apiAuth, deletePosition)


// hola

export default router
