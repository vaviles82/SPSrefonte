import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import newsletterRoutes from './routes/newsletterRoutes.js';
import requestRoutes from './routes/requestRoutes.js';
import articleRoutes from './routes/articleRoutes.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost', // Plus de "*" ici, on met l'URL précise du front
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true 
}));
app.use(express.json());

app.get('/debug-test', (req, res) => {
  console.log("DEBUG: Requête reçue sur /debug-test");
  res.send("L'API répond bien !");
});

// Routes propres et segmentées
app.use('/api/articles', articleRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/email', newsletterRoutes);

// On garde juste la route de santé pour Docker
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Serveur SPS opérationnel' });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Serveur lancé sur le port ${PORT}`);
  });
} 

export default app;