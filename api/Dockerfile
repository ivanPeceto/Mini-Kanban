
FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# RECORDATORIO: Cambiar a producción antes de entregar
CMD ["npm", "run", "start:dev"]