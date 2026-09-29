FROM node:22-alpine

WORKDIR /app

RUN npm install -g pnpm@9

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

# --- AGREGAR ESTAS DOS LÍNEAS ANTES DE BUILD ---
ARG NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL
# -----------------------------------------------

RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]
