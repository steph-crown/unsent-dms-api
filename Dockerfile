FROM node:20 as development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --development
RUN rm -rf .npmrc

COPY tsconfig*.json ./
COPY src/ src/

RUN npm run build

FROM node:20 as builder

WORKDIR /app

ARG NODE_ENV=production

COPY package*.json ./

RUN npm ci --production

FROM node:20-alpine as production

WORKDIR /app

RUN apk --no-cache add curl postgresql-client

COPY package*.json ./

COPY --from=builder /app/node_modules ./node_modules
COPY --from=development /usr/src/app/dist ./dist

EXPOSE 3001 443

CMD npx typeorm migration:run -d dist/config/typeorm.js && node dist/main
