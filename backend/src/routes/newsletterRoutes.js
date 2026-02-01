import express from 'express';
// Ajoute getTemplates dans l'import entre accolades
import { subscribeNewsletter, getAllSubscribers, getTemplates } from '../controllers/newsletterController.js';

const router = express.Router();

router.post('/subscribe', subscribeNewsletter);
router.get('/list', getAllSubscribers); 
router.get('/suscribers', getAllSubscribers); // Note la faute d'orthographe pour matcher ton front
router.get('/templates', getTemplates);



export default router;