import express from 'express';
// Assure-toi que les noms correspondent aux fonctions de ton controller
import { 
    getArticles, 
    getArticleById, 
    createArticle, 
    updateArticle, 
    deleteArticle 
} from '../controllers/articleController.js';

const router = express.Router();

// Route pour GET /api/articles (récupère tout ou filtre par catégorie)
router.get('/', getArticles);

// Route pour GET /api/articles/:id (récupère un article précis)
router.get('/:id', getArticleById);

// Route pour POST /api/articles (création)
router.post('/', createArticle);

// Route pour PUT /api/articles/:id (modification)
router.put('/:id', updateArticle);

// Route pour DELETE /api/articles/:id (suppression)
router.delete('/:id', deleteArticle);

export default router;