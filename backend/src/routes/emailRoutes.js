// backend/src/routes/emailRoutes.js
const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');
const { isAuthenticated, hasRole } = require('../middlewares/authMiddleware');

// Protected routes - require admin role
router.post('/send', isAuthenticated, hasRole('ADMIN'), emailController.sendEmail);
router.post('/send-batch', isAuthenticated, hasRole('ADMIN'), emailController.sendEmailInBatch);
router.get('/templates', isAuthenticated, hasRole('ADMIN'), emailController.getTemplates);
router.get('/suscribers', isAuthenticated, hasRole('ADMIN'), emailController.getSuscribers);

module.exports = router;