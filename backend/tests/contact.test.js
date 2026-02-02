import request from 'supertest';
import app from '../src/index.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('Test de l\'API Requests (Intégration)', () => {
  
  afterAll(async () => {
    // Correction : le modèle dans ton schema.prisma est 'ContactRequest'
    // Prisma génère automatiquement la propriété 'contactRequest'
    if (prisma.contactRequest) {
      await prisma.contactRequest.deleteMany();
    }
    await prisma.$disconnect();
  });

  it('devrait créer une nouvelle demande en base de données', async () => {
    const res = await request(app)
      .post('/api/requests/contact') // URL corrigée (préfixe + route)
      .send({
        first_name: "Test",
        last_name: "User",
        email: "test@swisspadelstars.ch",
        phone_number: "0123456789",
        company: "Test Corp",
        content: "Ceci est un test d'intégration."
      });

    expect(res.statusCode).toBe(201); 
    expect(res.body).toHaveProperty('id');

    const requestInDb = await prisma.contactRequest.findUnique({
      where: { id: res.body.id }
    });
    expect(requestInDb).not.toBeNull();
    expect(requestInDb.first_name).toBe("Test");
  });
});