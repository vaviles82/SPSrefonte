import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Début du seed...');

  // 1. Abonnés Newsletter (Ajout de plusieurs profils pour le test)
  console.log('Création des abonnés newsletter...');
  const subscribersData = [
    { email: 'admin@sps.ch', first_name: 'Admin', last_name: 'SPS', company: 'Swiss Padel Stars', active: true },
    { email: 'j.dupont@orange.fr', first_name: 'Jean', last_name: 'Dupont', company: 'Padel Club Lyon', active: true },
    { email: 'm.lefe@swiss-startup.ch', first_name: 'Marie', last_name: 'Lefebvre', company: 'Tech Léman', active: true },
    { email: 'l.muller@padelstars.com', first_name: 'Lucas', last_name: 'Muller', company: 'SPS Partner', active: true },
    { email: 's.viret@geneve-sport.ch', first_name: 'Sophie', last_name: 'Viret', company: 'Ville de Genève', active: false }
  ];

  for (const sub of subscribersData) {
    await prisma.newsletterSubscriber.upsert({
      where: { email: sub.email },
      update: {},
      create: sub,
    });
  }

  // 2. Demande de contact (déjà présent)
  await prisma.contactRequest.create({
    data: {
      first_name: 'Jean',
      last_name: 'Dupont',
      email: 'jean.dupont@example.com',
      phone_number: '+41 79 123 45 67',
      subject: 'Demande de partenariat',
      content: 'Bonjour, j\'aimerais organiser un tournoi de Padel avec vous.',
      type: 'GENERAL',
      status: 'NEW',
    },
  });

  // 3. AJOUT : Articles de test pour tes pages News, Blog et Events
  console.log('Création des articles de test...');
  
  const articlesData = [
    {
      title: "Lancement de la saison de Tennis",
      teaser: "Les inscriptions pour le tournoi d'été sont enfin ouvertes !",
      content: "Venez vous affronter sur nos nouveaux courts en terre battue.",
      category: "News",
      image: "https://padelmagazine.fr/wp-content/uploads/2023/03/Human-Padel-Open.JPG"
    },
    {
      title: "5 conseils pour votre revers",
      teaser: "Améliorez votre technique avec les conseils de nos coachs pros.",
      content: "Le revers à une main demande de la précision...",
      category: "Blog",
      image: "https://padelmagazine.fr/wp-content/uploads/2022/06/paula-josemaria-gauchere-revers-apres-vitre-2022.jpg.webp"
    },
    {
      title: "Soirée Networking Padel",
      teaser: "Une rencontre entre entreprises autour du sport.",
      content: "Rejoignez-nous pour une soirée conviviale...",
      category: "Events",
      image: "https://edito-img.annonces-legales.fr/2023/12/gettyimages-545820043-65717b36c3c52759562593.jpg?w=888&h=450&q=90&s=16aa2a17dbb257c3f07140ba643086e3"
    }
  ];

  // On attend que TOUTES les créations soient terminées
  const created = await Promise.all(
    articlesData.map(item => prisma.article.create({ data: item }))
  );

  console.log(`${created.length} articles créés !`);
  console.log('Seed terminé avec succès !');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });