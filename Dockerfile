FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN adduser -D appuser
USER appuser
EXPOSE 4200
CMD ["npm", "start"]