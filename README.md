# # SwissPaddelStars - Refonte

Ce projet utilise une architecture micro-services conteneurisée avec **Docker**. 
Il comprend un frontend React (Vite), un backend Node.js (Express/Prisma) et une base de données PostgreSQL.

## Procédure de Déploiement

### Pré-requis
- Docker Desktop et Docker Compose installés.
- Port 80 (Frontend) et 5000 (Backend) disponibles.

### Installation et Lancement
Pour construire les images et lancer l'ensemble des services en mode détaché :

```bash
docker-compose up -d --build
```

### Initialisation de la Base de Données
Une fois les conteneurs actifs, exécutez les migrations Prisma et le remplissage (seeding) des données initiales :


### Appliquer les schémas de base de données
```bash
docker-compose exec api npx prisma migrate dev --name init
```

### Peupler la base avec les données de test (Articles, Newsletter, Admin)
```bash
docker-compose exec api npx prisma db seed
```

### Procédures de Tests
1. Tests d'Intégration (Backend)
Lancés automatiquement via GitHub Actions à chaque push.

```bash
docker-compose exec api npm test
```

2. Tests de Charge (k6)
Exécuter le test de performance sur l'endpoint Newsletter :

```bash
docker run --rm -i --network spsrefonte_default -v ${PWD}:/src grafana/k6 run /src/load-test.js
```

3. Audit de Sécurité
Vérification des vulnérabilités des dépendances :

```bash
docker-compose exec api npm audit
```