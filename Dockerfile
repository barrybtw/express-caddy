FROM node:18-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build
EXPOSE 8001

CMD ["pnpm", "start"]