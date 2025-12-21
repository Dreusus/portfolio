FROM node:20-alpine

RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

ARG BACKEND_URL
ENV BACKEND_URL=$BACKEND_URL

RUN pnpm build

# Копируем статические файлы для standalone режима
RUN cp -r public .next/standalone/public
RUN cp -r .next/static .next/standalone/.next/static

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", ".next/standalone/server.js"]
