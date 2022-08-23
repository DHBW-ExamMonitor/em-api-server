FROM --platform=linux/amd64 node:16-alpine as base

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

WORKDIR /app
COPY package*.json /
COPY prisma ./prisma/

RUN apk add chromium openssl
RUN npm ci
RUN npx prisma generate

COPY . .

EXPOSE 3000

FROM base as production
ENV NODE_ENV=production
# RUN npm ci
# COPY . /
CMD ["npm", "run", "start"]

FROM base as dev
ENV NODE_ENV=development
# RUN apt install openssl
# RUN npm ci
# RUN npx prisma generate
# RUN npx prisma migrate dev
# COPY . /
CMD ["npm", "run", "dev"]