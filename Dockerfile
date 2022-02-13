FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

RUN ls -la

COPY . .

EXPOSE 3333

CMD ["npm", "run", "dev"]