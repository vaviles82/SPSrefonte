import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Route de test
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Le serveur de SwissPadelStars fonctionne !' });
});

// Route POST : Enregistrer un message
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const contact = await prisma.contact.create({
      data: { name, email, message }
    });
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de l'enregistrement" });
  }
});

// Route GET : Récupérer tous les messages (Pour la page Admin)
app.get('/api/contact', async (req, res) => {
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération" });
  }
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Serveur SPS lancé sur http://localhost:${PORT}`);
  });
}

export default app; // Important pour les tests