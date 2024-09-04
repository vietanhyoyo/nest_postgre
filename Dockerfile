FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache python3 make g++

COPY package*.json ./

RUN npm install

COPY . .

RUN npm rebuild bcrypt --build-from-source

RUN npm run build

RUN npm install -g cross-env

RUN npm prune --production

CMD ["npm", "run", "start:prod"]

EXPOSE 3004
