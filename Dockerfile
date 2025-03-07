# Étape 1 : Construire l'application Angular
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Étape 2 : Servir l'application avec Nginx
FROM nginx:alpine

COPY --from=build /app/dist/app-graduate-portfolio /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]