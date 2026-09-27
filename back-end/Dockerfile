FROM node:22-alpine

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@12.3.4 --activate

COPY package.json pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./

RUN pnpm install

COPY . .

EXPOSE 4000

CMD ["pnpm", "start:dev"]