# DHBW-ExamMonitor Backend

## Abhängigkeiten & Technologien

- Express.js (https://expressjs.com)
  - Web-Framework
  - Bereitstellung der REST-Schnittstellen
- Prisma (Schema & Migrationen) (https://www.prisma.io)
  - ORM (Object-Relational-Mapping) für NodeJS
  - Datenbank-Migrationen bei Änderungen des Schemas
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

⚠️ **Achtung**:</br>
Die produktiven Services legen ein Docker Volume unter dem Pfad **pg_data** an. 
Dieses Docker Volume stellt den Speicherbereich für die Postgres-Datenbank dar und darf nach der ersten Erstellung nicht mehr gelöscht werden, da sonst auch alle Daten gelöscht werden.

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

**Hinweise zum Backup:**</br>
Sollte die DHBW Ressourcen für das Sichern von Postgres-Datenbanken besitzen, kann diese auch in eine entsprechende Backup-Software integriert werden.

**Hinweise zur Verfügbarkeit:**</br>
Im Fall eines Ausfalls (z.B. aufgrund eines Stromausfalls) fährt Docker compose alle erforderlichen Services wieder hoch. Sollte es dennoch zu Problemen kommen, können die Logs der Services über folgenden Befehl aufgerufen werden:

```bash
$ docker-compose logs
```

Diese liefern hilfreiche Informationen in Bezug auf mögliche Gründe der Nicht-Verfügbarkeit einzelner Services.
