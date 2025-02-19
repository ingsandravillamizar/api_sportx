import express from 'express';import { apiAuth } from '../../../auth/middleware/apiauth.js';
import { createClub, deleteClub, updateClub, getClubes, getClub } from './clubController.js';
import { validateCreateClub, validateGetClub } from './clubValidator.js';


//falta arreglar las validaciones...
const router = express.Router();

router.get('/', apiAuth, getClubes)
router.get('/:id', apiAuth, validateGetClub,  getClub)
router.post('/create', apiAuth, validateCreateClub, createClub)
router.put('/:id', apiAuth,validateGetClub,  updateClub)
router.delete('/delete/:id',  apiAuth, deleteClub)


// hola

export default router
