import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import newsletterRoutes from './routes/newsletterRoutes.js';
import requestRoutes from './routes/requestRoutes.js';
import articleRoutes from './routes/articleRoutes.js';//DANGER 


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: '*', // Pour le développement, on autorise tout le monde
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes propres et segmentées
app.use('/api/articles', articleRoutes);//DANGER
app.use('/api', requestRoutes);
app.use('/api/newsletter', newsletterRoutes);

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