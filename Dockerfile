FROM node:22-bookworm-slim

WORKDIR /app

# Copia apenas package primeiro (melhor cache)
COPY package*.json ./

RUN npm ci

# Copia o restante
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
