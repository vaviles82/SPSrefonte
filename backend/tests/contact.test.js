import request from 'supertest';
import app from '../src/index.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('Test de l\'API Requests (Intégration)', () => {
  
  // Nettoyage après les tests
  afterAll(async () => {
    // Utilisation de .request au lieu de .contact
    await prisma.request.deleteMany(); 
    await prisma.$disconnect();
  });

  it('devrait créer une nouvelle demande en base de données', async () => {
    const res = await request(app)
      .post('/api/requests') // Route mise à jour
      .send({
        first_name: "Test",
        last_name: "User",
        email: "test@swisspadelstars.ch",
        phone_number: "0123456789",
        company: "Test Corp",
        content: "Ceci est un test d'intégration."
      });

    // Vérification du code 201 ou 200 selon ton contrôleur
    expect(res.statusCode).toBe(201); 
    expect(res.body).toHaveProperty('id');

    // Vérification réelle dans la DB
    const requestInDb = await prisma.request.findUnique({
      where: { id: res.body.id }
    });
    expect(requestInDb).not.toBeNull();
    expect(requestInDb.first_name).toBe("Test");
  });
});