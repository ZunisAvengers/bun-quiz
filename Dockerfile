FROM oven/bun:latest

COPY bun.lockb package.json migration.ts tsconfig.json ./
COPY src ./src
# COPY drizzle ./drizzle

RUN apt-get update && apt-get install -y sqlite3
RUN bun install
RUN bun run generate-migration
RUN bun run migration-db

CMD ["bun", "run", "dev"]