# Utilisation d'une image Node légère
FROM node:20-slim

# Installation de openssl pour Prisma
RUN apt-get update -y && apt-get install -y openssl

# Dossier de travail dans le conteneur
WORKDIR /app

# Copie des fichiers de dépendances
COPY package*.json ./
COPY prisma ./prisma/

# Installation des dépendances
RUN npm install

# Copie du reste du code
COPY . .

# Génération du client Prisma
RUN npx prisma generate

# Port exposé par le conteneur
EXPOSE 3000

# Commande de lancement
CMD ["npm", "start"]