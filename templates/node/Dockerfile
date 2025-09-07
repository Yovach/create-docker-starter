# syntax=docker/dockerfile:1
ARG NODE_VERSION=${NODE_VERSION:-22.19-bookworm-slim}

# Common stage for every targets
FROM node:${NODE_VERSION} AS base
WORKDIR /app

COPY package.json package-lock.json ./

# Image for development
FROM base AS dev

RUN npm ci
COPY . .

CMD ["node", "--run", "dev"]

# Compile TypeScript to JavaScript
FROM base AS builder

RUN npm ci
COPY . .

RUN ["npx", "tsc"]

# Production image
FROM base AS prod

RUN npm ci --omit dev
COPY --from=builder /app/dist ./dist

CMD ["node", "dist/main.js"]
