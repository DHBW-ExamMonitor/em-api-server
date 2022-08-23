[![deploy](https://github.com/DHBW-ExamMonitor/em-api-server/actions/workflows/ci.yml/badge.svg)](https://github.com/DHBW-ExamMonitor/em-api-server/actions/workflows/ci.yml)

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

To generate fake Kurse and Studenten run:

```bash
$ npm run fake
```

Start the server (dev):

```bash
$ npm run dev
```

Docker Dev:

```bash
$ docker compose -f docker-compose.dev.yaml up -d --build
```

Docker Prod:

```bash
$ docker compose up -d
```
