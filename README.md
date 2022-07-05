# Server

Note-Server with NodeJS, Express, Prisma und Postgres

## Setup

Generate prisma client:

```bash
$ npx prisma generate
```

Install dependencies:

```bash
$ npm install
```

Set environment variables:

```bash
$ cp .env.example .env
```

Start services (Postgres):

```bash
$ docker-compose up -d
```

Apply database migrations (dev):

```bash
$ npx prisma db push
```

Start the server (dev):

```bash
$ npm run dev
```
