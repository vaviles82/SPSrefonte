const express = require('express');
const { 
  login, 
  getProfile, 
  createTestAdmin, 
  logOut, 
  getAdmins, 
  createAdmin, 
  updateAdmin, 
  deleteAdmin 
} = require('../controllers/userController');

const { isAuthenticated, hasRole } = require('../middlewares/authMiddleware');

const router = express.Router();

// Authentication routes
router.post('/login', login);
router.get('/profile', getProfile);
router.get('/createTest', createTestAdmin); // TODO: Remove in production
router.post('/logout', logOut);

// Admin management routes - all protected with auth and admin role
router.get('/admins', isAuthenticated, hasRole('ADMIN'), getAdmins);
router.post('/create', isAuthenticated, hasRole('ADMIN'), createAdmin);
router.put('/:id', isAuthenticated, hasRole('ADMIN'), updateAdmin);
router.delete('/:id', isAuthenticated, hasRole('ADMIN'), deleteAdmin);

module.exports = router;