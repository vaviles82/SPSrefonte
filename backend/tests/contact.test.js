import request from 'supertest';
import app from '../src/index.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('Test de l\'API Contact (Intégration)', () => {
  
  // Nettoyage de la base de données après les tests
  afterAll(async () => {
    await prisma.contact.deleteMany();
    await prisma.$disconnect();
  });

  it('devrait créer un nouveau message de contact en base de données', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({
        name: "Test User",
        email: "test@swisspadelstars.ch",
        message: "Ceci est un test d'intégration avec Docker."
      });

    // Vérification de la réponse HTTP
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe("Test User");

    // Vérification réelle dans la base de données Docker via Prisma
    const contactInDb = await prisma.contact.findUnique({
      where: { id: res.body.id }
    });
    expect(contactInDb).not.toBeNull();
    expect(contactInDb.email).toBe("test@swisspadelstars.ch");
  });
});