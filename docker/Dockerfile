FROM caddy:2.0.0-alpine AS Caddy

COPY --from=Caddy /usr/bin/caddy /usr/bin/caddy

FROM node:current-alpine3.12 AS Node

WORKDIR /tygercaddy/backend
COPY /backend/* ./
RUN npm install

WORKDIR /tygercaddy/frontend
COPY /frontend/* ./
RUN npm install

WORKDIR /tygercaddy/docker
COPY /docker/start.sh ./

EXPOSE 3000
EXPOSE 8080

