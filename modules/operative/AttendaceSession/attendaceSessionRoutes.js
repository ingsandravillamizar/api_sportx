import express from 'express';import { apiAuth } from '../../../auth/middleware/apiauth.js';
import upload, { attendanceUpload } from '../../../middleware/uploadFile.js';
import { createSession, deleteSession, getSession, getSessions, updateSession } from './attendaceSessionController.js';
import { validateCreateSession, validateGetSession, validateUpdateSession } from './attendaceSessionValidator.js';



const router = express.Router();

router.get('/', apiAuth, getSessions)
router.get('/:id', apiAuth, validateGetSession,  getSession)
router.post('/create', apiAuth,  attendanceUpload.single('image'), validateCreateSession,createSession)
router.put('/:id', apiAuth,attendanceUpload.single('image'), validateUpdateSession,  updateSession)
router.delete('/delete/:id',  apiAuth, deleteSession)





export default router
