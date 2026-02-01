import prisma from "../config/db.js";

export const getArticles = async (req, res) => {
  try {
    const { category } = req.query; // On récupère "News", "Blog" ou "Events" depuis l'URL

    const articles = await prisma.article.findMany({
      where: category ? { category: category } : {}, // Si category est fourni, on filtre. Sinon, on prend tout.
      orderBy: { createdAt: 'desc' }
    });

    res.json(articles);
  } catch (error) {
    console.error("Erreur Prisma:", error.message);
    res.status(500).json({ message: "Erreur lors de la récupération" });
  }
};

// Créer un article
export const createArticle = async (req, res) => {
  const { title, teaser, content, image, category } = req.body;
  try {
    const article = await prisma.article.create({
      data: { title, teaser, content, image, category }
    });
    res.status(201).json(article);
  } catch (error) {
    console.error("Erreur Create Article:", error);
    res.status(500).json({ message: "Erreur lors de la création de l'article." });
  }
};

// Récupérer un article seul
export const getArticleById = async (req, res) => {
  const { id } = req.params;
  try {
    const article = await prisma.article.findUnique({ where: { id: parseInt(id) } });
    if (!article) return res.status(404).json({ message: "Article non trouvé." });
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur." });
  }
};

// Supprimer un article
export const deleteArticle = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.article.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Article supprimé avec succès." });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression." });
  }
};

// Mettre à jour un article
export const updateArticle = async (req, res) => {
  const { id } = req.params;
  const { title, teaser, content, image, category } = req.body;
  try {
    const updated = await prisma.article.update({
      where: { id: parseInt(id) },
      data: { title, teaser, content, image, category }
    });
    res.json(updated);
  } catch (error) {
    console.error("Erreur Update Article:", error);
    res.status(500).json({ message: "Erreur lors de la mise à jour." });
  }
};