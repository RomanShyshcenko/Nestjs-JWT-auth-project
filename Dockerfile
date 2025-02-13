FROM node:23.7.0-alpine
LABEL authors="amigo"

WORKDIR /app
COPY package*.json ./

RUN npm i

COPY . .
COPY ./dist ./dist

CMD ["npm", "run", "start:dev"]
