# DHBW-ExamMonitor Backend

Projekt: https://github.com/DHBW-ExamMonitor/em-api-server

## Abhängigkeiten & Technologien

- Express.js (https://expressjs.com)
  - Web-Framework
  - Bereitstellung der REST-Schnittstellen
- Prisma (Schema & Migrationen) (https://www.prisma.io)
  - ORM (Object-Relational-Mapping) für NodeJS
  - Datenbank-Migrationen bei Änderungen des Schemas
- Prisma Studio (dev) (https://www.prisma.io/studio)
  - Entwickler-Einsicht in die Datenbank unter http://localhost:5555
- Postgres-Datenbank (SQL) (https://www.postgresql.org)
- Docker (Docker Compose v2) (https://docs.docker.com/compose/)
  - Containerisierung der Anwendungen für den einfachen Produktivbetrieb
- Prisma-ERD-Generator (Generierung eines ERM (Entity-Relationship-Model)) (https://github.com/keonik/prisma-erd-generator)
- NodeJS > v14 (https://nodejs.org/en/)

## Einrichtung

Zur vereinfachten Bereitstellung statischer Services, wie beispielsweise die Postgres-Datenbank, wird Docker mit Docker Compose eingesetzt. Dabei enthält Docker Compose die Beschreibung aller im Rahmen des Backend erforderlichen Services und fasst diese in einer Datei zusammen.

Im Ordner **dockerfiles/** wird der Container des Servers im Entwicklungs- sowie Produktivmodus beschrieben und entsprechend in den Docker-Compose-Dateien integriert. Dabei wird der Prisma-Client, der für das ORM notwendig ist, direkt generiert.

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
Im Fall eines Ausfalls (z.B. aufgrund eines Stromausfalls) fährt Docker Compose alle erforderlichen Services wieder hoch. Sollte es dennoch zu Problemen kommen, können die Logs der Services über folgenden Befehl aufgerufen werden:

```bash
$ docker-compose logs
```

Diese liefern hilfreiche Informationen in Bezug auf mögliche Gründe der Nicht-Verfügbarkeit einzelner Services.

## Generierung eines ERM (Entity-Relationship-Model)

primsa/**prisma.schema**-Datei anpassen:

```js
generator erd {
  provider = "prisma-erd-generator"
  output = "./ERD.pdf"
}
```

⚠️ **Achtung**:</br>
Es darf nur ein Generator in der Datei enthalten sein. Eventuell muss der andere Generator auskommentiert werden, um das ERM zu erstellen.

Anschließend Dev-Migration durchführen:

```bash
$ npx prisma migrate dev
```

Die ERM-Datei wird als PDF im Hauptverzeichnis gespeichert.

## Verzeichnis

```
.
├── dockerfiles             # Verzeichnis für Docker Datei für Web-Service
├── prisma                  # Verzeichnis für Prisma-Konfiguration
    ├── schema.prisma       # Datenbank Schema
    └── migrations          # Verzeichnis der getätigten Datenbankmigrationen
├── .dockerignore           # Auflistung der für Docker Container irrelevanten Dateien
├── .env.example            # Beispielhafte Umgebungsvariablen für den Betrieb von Dev und Prod
├── docker-compose.dev.yaml # Beschreibung der Services für die Entwicklungsumgebung
├── docker-compose.yaml     # Beschreibung der Services für die Produktivumgebung
└── src                     # Quellcode
```
