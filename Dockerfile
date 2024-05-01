FROM mysql:latest
WORKDIR /overcooked
EXPOSE 3307
COPY init_mysql.sh /docker-entrypoint-initdb.d/init_mysql.sh
RUN chmod +x /docker-entrypoint-initdb.d/init_mysql.sh

FROM node:18.17.0
WORKDIR /overcooked
COPY package*.json ./
RUN npm install
EXPOSE 4000
COPY . .
CMD ["node", "server.ts"]
