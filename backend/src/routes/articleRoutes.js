import express from 'express';
import { authenticateToken } from '../middlewares/auth.js'; // Import indispensable
import { 
    getArticles, 
    getArticleById, 
    createArticle, 
    updateArticle, 
    deleteArticle 
} from '../controllers/articleController.js';

const router = express.Router();

// PUBLIC : Tout le monde peut voir
router.get('/', getArticles);
router.get('/:id', getArticleById);

// PRIVÉ : Seul l'admin peut modifier
router.post('/', authenticateToken, createArticle);
router.put('/:id', authenticateToken, updateArticle);
router.delete('/:id', authenticateToken, deleteArticle);

export default router;