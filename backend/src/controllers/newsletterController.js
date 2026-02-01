import prisma from "../config/db.js";

// Fonction pour s'inscrire (déjà présente)
export const subscribeNewsletter = async (req, res) => {
  const { email } = req.body;

  try {
    const subscriber = await prisma.newsletterSubscriber.create({
      data: { email: email }
    });
    res.status(201).json(subscriber);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ message: "Vous êtes déjà inscrit !" });
    }
    res.status(500).json({ message: "Erreur technique" });
  }
};

export const getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await prisma.newsletterSubscriber.findMany({
      orderBy: { createdAt: 'desc' }
    });
    // On s'assure de renvoyer un tableau
    res.status(200).json(subscribers || []);
  } catch (error) {
    console.error("ERREUR PRISMA:", error); // CE LOG TE DIRA TOUT
    res.status(500).json({ message: "Erreur lors de la récupération des abonnés" });
  }
};

export const getTemplates = async (req, res) => {
  try {
    res.status(200).json({ templates: [] });
  } catch (error) {
    res.status(500).json({ message: "Erreur templates" });
  }
};