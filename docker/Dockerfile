FROM caddy:2.0.0-alpine AS caddy



FROM node:alpine AS node
WORKDIR /tygercaddy/backend
COPY /backend/* ./
RUN apk add --no-cache python make g++
RUN npm install

WORKDIR /tygercaddy/frontend
COPY /frontend/* ./
RUN npm install

#WORKDIR /tygercaddy/docker
#COPY /docker/start.sh ./



COPY --from=caddy /usr/bin/caddy /usr/bin/caddy

EXPOSE 3000
EXPOSE 8080