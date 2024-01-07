# Elysia with Bun runtime

## Init
```bash
bun install
bun run migration-db
```

## Development
To start the development server run:
```bash
bun run dev
```

## Development on Windows with Docker
```bash
docker rm bun-quiz_bun_1
docker rmi quiz:1
docker build --tag quiz:1 .
docker-compose up
```

Open http://localhost:3000/ with your browser to see the result.