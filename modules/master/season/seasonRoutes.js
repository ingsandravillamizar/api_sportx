import express from 'express';import { apiAuth } from '../../../auth/middleware/apiauth.js';
import { validateCreateSeason, validateGetSeason } from './seasonValidator.js';
import { createSeason, deleteSeason, getSeason, getSeasons, updateSeason } from './seasonController.js';


//falta arreglar las validaciones...
const router = express.Router();

router.get('/', apiAuth, getSeasons)
router.get('/:id', apiAuth, validateGetSeason,  getSeason)
router.post('/create', apiAuth, validateCreateSeason, createSeason)
router.put('/:id', apiAuth,validateGetSeason,  updateSeason)
router.delete('/delete/:id',  apiAuth, deleteSeason)


// hola

export default router
