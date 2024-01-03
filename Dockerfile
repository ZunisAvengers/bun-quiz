FROM oven/bun:latest

COPY bun.lockb package.json ./
COPY src ./src

RUN bun install
CMD ["bun", "dev"]