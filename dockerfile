# build step
FROM node:16 AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

RUN npm ci
RUN npx prisma generate

COPY . .

ENV NODE_ENV production

# production image
FROM node:16 AS runner

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 app

WORKDIR /app
RUN chown -R app:nodejs /app

COPY --from=builder --chown=app:nodejs /app/package*.json ./package.json
COPY --from=builder --chown=app:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=app:nodejs /app/build ./build
COPY --from=builder --chown=app:nodejs /app/src ./src
COPY --from=builder --chown=app:nodejs /app/prisma ./prisma
COPY --from=builder --chown=app:nodejs --chmod=0755 /app/entrypoint.sh .

USER app

EXPOSE 8000

ENV NODE_ENV production
ENV DATABASE_URL "file:/app/prod.db"

ENTRYPOINT [ "/app/entrypoint.sh" ] 