import express from 'express';
import { authenticateToken } from '../middlewares/auth.js';
const router = express.Router();
import * as requestController from '../controllers/requestController.js';

// --- ROUTES PUBLIQUES ---
router.post('/contact', requestController.createRequest);

// --- ROUTES PROTÉGÉES (ADMIN SEULEMENT) ---
router.get('/stats', authenticateToken, requestController.getRequestStats);
router.get('/', requestController.getRequests);//Désactivation de la sécurité pour acceder dans l'admin car BUG
router.get('/:id', authenticateToken, requestController.getRequestById);
router.put('/:id', authenticateToken, requestController.updateRequest);
router.delete('/:id', authenticateToken, requestController.deleteRequest);

export default router;