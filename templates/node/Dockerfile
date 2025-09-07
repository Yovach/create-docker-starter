# syntax=docker/dockerfile:1
FROM node:22.19-alpine AS dev
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

CMD ["node", "--run", "dev"]
