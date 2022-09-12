# DHBW-ExamMonitor Backend

## Abhängigkeiten & Technologien

- Express.js (https://expressjs.com)
  - Web-Framework
  - Bereitstellung der REST-Schnittstellen
- Prisma (Schema & Migrationen) (https://www.prisma.io)
  - ORM (Object-Relational-Mapping)
  - Automatisierung der Migrationen
- Prisma Studio (dev) (https://www.prisma.io/studio)
  - Entwickler-Einsicht in die Datenbank unter http://localhost:5555
- Postgres-Datenbank (SQL)
- Docker (Docker Compose v2)
  - Containerisierung der Anwendungen für den einfachen Produktivbetrieb
- NodeJS > v14

## Einrichtung

### Entwicklungsumgebung

Umgebungsvariablen kopieren & setzen:

```bash
$ cp .env.example .env
```

Node Modules installieren:

```bash
$ npm install
```

Prisma-Client generieren:

```bash
$ npx prisma generate
```

Docker-Dienste starten (dev: Datenbank & Prisma Studio):

```bash
$ docker-compose -f docker-compose.dev.yaml up -d --build
```

Datenbank-Migrationen übernehmen:

```bash
$ npx prisma db push
```

Entwicklungsserver starten:

```bash
$ npm run dev
```

### Produktivumgebung

Umgebungsvariablen kopieren & setzen:

```bash
$ cp .env.example .env
```

Docker-Dienste starten (prod):

```bash
$ docker-compose up -d
```

Datenbank-Migrationen übernehmen:

```bash
$ npx prisma migrate deploy
```
