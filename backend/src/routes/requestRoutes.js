import express from 'express';
const router = express.Router();
import * as requestController from '../controllers/requestController.js';

router.post('/contact', requestController.createRequest);
router.get('/stats', requestController.getRequestStats);
router.get('/', requestController.getRequests);
router.get('/:id', requestController.getRequestById);
router.put('/:id', requestController.updateRequest);
router.delete('/:id', requestController.deleteRequest);

export default router;