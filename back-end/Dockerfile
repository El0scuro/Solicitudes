FROM node:22-alpine

WORKDIR /app

# Cambiar la versión 12.3.4 por una versión válida
RUN npm install -g pnpm@9

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --network-concurrency=1

COPY . .

EXPOSE 4001

CMD ["pnpm", "start:dev"]
