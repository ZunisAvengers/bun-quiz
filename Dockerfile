FROM oven/bun:latest

COPY bun.lockb package.json migration.ts tsconfig.json ./
COPY src ./src
COPY drizzle ./drizzle

RUN bun install
RUN bun run migration-db

CMD ["bun", "run", "dev"]