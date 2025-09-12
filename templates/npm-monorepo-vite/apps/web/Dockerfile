# syntax=docker/dockerfile:1
ARG NODE_VERSION=${NODE_VERSION:-22.19-bookworm-slim}

# Common stage for every targets
FROM node:${NODE_VERSION} AS base
USER node
WORKDIR /app

COPY package.json package-lock.json ./
COPY --chown=1000:1000 ./apps/web/package.json ./apps/web/
COPY --chown=1000:1000 ./packages/ui/package.json ./packages/ui/

# Image for development
FROM base AS dev

RUN npm ci
COPY --chown=1000:1000 . .

RUN ["npm", "run", "--workspace=./packages/ui", "build"]
CMD ["npm", "run", "--workspace=./apps/web", "dev", "--", "--host"]

# Compile TypeScript to JavaScript
FROM base AS builder

RUN npm ci
COPY . .

RUN npm run --workspace=./packages/ui build && \
  npm run --workspace=./apps/web build

# Production image
FROM nginx:1.29.1-alpine AS prod

COPY --from=builder /app/apps/web/dist/ /usr/share/nginx/html
