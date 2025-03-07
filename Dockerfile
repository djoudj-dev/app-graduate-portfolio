# Étape 1 : Construire l'application Angular
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build -- --configuration production

# Étape 2 : Servir l'application avec Nginx
FROM nginx:alpine

# Crée le répertoire pour les fichiers statiques
RUN mkdir -p /usr/share/nginx/html/browser

# Copie les fichiers buildés depuis l'étape de build
COPY --from=build /app/dist/app-graduate-portfolio /usr/share/nginx/html/browser

# Copie la configuration Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]