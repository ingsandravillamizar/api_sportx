import express from 'express';import { apiAuth } from '../../../auth/middleware/apiauth.js';
import { validateCreateCompany, validateGetCompany } from './companyValidator.js';
import { createCompany, deleteCompany, getCompanies, getCompany, updateCompany } from './companyController.js';


//falta arreglar las validaciones...
const router = express.Router();

router.get('/', apiAuth, getCompanies)
router.get('/:id', apiAuth, validateGetCompany,  getCompany)
router.post('/create', apiAuth, validateCreateCompany, createCompany)
router.put('/:id', apiAuth,validateGetCompany,  updateCompany)
router.delete('/delete/:id',  apiAuth, deleteCompany)


// hola

export default router
