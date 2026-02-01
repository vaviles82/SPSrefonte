import express from 'express';
const router = express.Router();
import * as requestController from '../controllers/requestController.js';

// 1. Les routes STATIQUES (sans paramètres)
router.get('/stats', requestController.getRequestStats);
router.get('/', requestController.getRequests);
router.post('/contact', requestController.createRequest);

// 2. Les routes DYNAMIQUES (avec :id) toujours à la fin
router.get('/:id', requestController.getRequestById);
router.put('/:id', requestController.updateRequest);
router.delete('/:id', requestController.deleteRequest);

export default router;