# Étape 1 : Construction de l'application
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# Étape 2 : Serveur Nginx
FROM nginx:stable-alpine
# On copie les fichiers compilés par React
COPY --from=build /app/dist /usr/share/nginx/html

# ON AJOUTE CETTE COMMANDE POUR LA CONFIGURATION :
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]