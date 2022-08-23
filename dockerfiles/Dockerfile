FROM --platform=linux/amd64 node:16-alpine as base

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

WORKDIR /app
COPY package*.json /
COPY prisma ./prisma/

RUN apk add chromium openssl
RUN npm ci

COPY . .

EXPOSE 3000

FROM base as production

RUN npx prisma generate
ENV NODE_ENV=production
CMD ["npm", "run", "start"]

FROM base as dev

RUN npx prisma generate
ENV NODE_ENV=development
CMD ["npm", "run", "start"]