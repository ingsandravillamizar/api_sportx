import express from 'express';import { apiAuth } from '../../../auth/middleware/apiauth.js';
import { createIdentificationType, deleteIdentificationType, getIdentificationType, getIdentificationTypes, updateIdentificationType, } from './identificationTypesController.js';
import { validateCreateidentificationType, validateGetidentificationType } from './identificationTypesValidator.js';


//falta arreglar las validaciones...
const router = express.Router();

router.get('/', apiAuth, getIdentificationTypes)
router.get('/:id', apiAuth, validateGetidentificationType,  getIdentificationType)
router.post('/create', apiAuth, validateCreateidentificationType, createIdentificationType)
router.put('/:id', apiAuth,validateGetidentificationType,  updateIdentificationType)
router.delete('/delete/:id',  apiAuth, deleteIdentificationType)


export default router
