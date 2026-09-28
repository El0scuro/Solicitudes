FROM node:22-alpine

WORKDIR /app

RUN npm install -g pnpm@9

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

EXPOSE 3001

CMD ["pnpm", "dev"]
