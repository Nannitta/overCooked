FROM mysql:latest
WORKDIR /overcooked
COPY ./escandallos.sql /docker-entrypoint-initdb.d/escandallos.sql
EXPOSE 3307

FROM node:18.17.0
WORKDIR /overcooked
COPY package*.json ./
RUN npm install
EXPOSE 4000
COPY . .
CMD ["node", "server.ts"]
