import express from 'express';
const router = express.Router();
// On importe le controller (vérifie si tu as besoin de l'extension .js selon ta config)
import emailController from '../controllers/emailController.js'; 
import { isAuthenticated, hasRole } from '../middlewares/authMiddleware.js';

// Protected routes
router.post('/send', isAuthenticated, hasRole('ADMIN'), emailController.sendEmail);
router.post('/send-batch', isAuthenticated, hasRole('ADMIN'), emailController.sendEmailInBatch);
router.get('/templates', isAuthenticated, hasRole('ADMIN'), emailController.getTemplates);
router.get('/subscribers', isAuthenticated, hasRole('ADMIN'), emailController.getSuscribers);

export default router;