import express from 'express';import { apiAuth } from '../../../auth/middleware/apiauth.js';
import { validateCreateCategory, validateGetCategory } from './categoryValidator.js';
import { createCompany, deleteCompany, getCompanies, getCompany, updateCompany } from './companyController.js';


//falta arreglar las validaciones...
const router = express.Router();

router.get('/', apiAuth, getCompanies)
router.get('/:id', apiAuth, validateGetCompany,  getCompany)
router.post('/create', apiAuth, validateCreateCategory, createCompany)
router.put('/:id', apiAuth,validateGetCategory,  updateCompany)
router.delete('/delete/:id',  apiAuth, deleteCompany)


// hola

export default router
