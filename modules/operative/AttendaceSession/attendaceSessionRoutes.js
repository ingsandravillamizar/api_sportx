import express from 'express';import { apiAuth } from '../../../auth/middleware/apiauth.js';
import { attendanceUpload } from '../../../middleware/uploadFile.js';
import { createSession, deleteSession, getSession, getSessions, updateSession, getLastSessionsByCategory } from './attendaceSessionController.js';
import { validateCreateSession, validateGetSession, validateUpdateSession, validateGetLastSessionsByCategory } from './attendaceSessionValidator.js';
import { parseFormData } from '../../../middleware/parseFormData.js';


const router = express.Router();

router.get('/', apiAuth, getSessions)
router.get('/:id', apiAuth, validateGetSession,  getSession)
router.get('/category/:categoryId', apiAuth, validateGetLastSessionsByCategory, getLastSessionsByCategory)
router.post('/create', apiAuth,  attendanceUpload.single('photo'), parseFormData, validateCreateSession,createSession)
router.put('/:id', apiAuth,attendanceUpload.single('photo'), validateUpdateSession,  updateSession)
router.delete('/delete/:id',  apiAuth, deleteSession)





export default router
