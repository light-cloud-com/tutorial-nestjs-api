# tutorial-nestjs-api

A small NestJS 12 API with a PostgreSQL connection, used in the Light Cloud tutorial
[Deploy a NestJS API with a database connection](https://blog.light-cloud.com/tutorials/deploy-a-nestjs-api).

```mermaid
flowchart LR
  client[Client] -->|HTTPS| lc[Light Cloud]
  lc -->|PORT| nest[NestJS app]
  nest --> notes[NotesController]
  nest --> health[HealthController]
  notes --> db[(PostgreSQL via DATABASE_URL)]
  health --> db
```

## Run it

```sh
npm install
DATABASE_URL='postgresql://user:password@host:5432/db?sslmode=require&uselibpqcompat=true' npm run start
```

| Route | What it does |
|---|---|
| `GET /health` | checks the database too |
| `GET /notes` | latest 50 notes |
| `POST /notes` | `{"text": "..."}`, validated |
| `GET /notes/:id` | one note, or 404 |
