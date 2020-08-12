#Prep the caddy image for the binary
FROM caddy:builder AS caddy
RUN caddy-builder \
    github.com/caddy-dns/digitalocean \
    github.com/caddy-dns/cloudflare \
    github.com/caddy-dns/dnspod \
    github.com/caddy-dns/route53 \
    github.com/caddy-dns/gandi

#Build the backend
FROM node:alpine AS nodebackend
RUN apk add --no-cache python make g++
WORKDIR /tygercaddy/backend
COPY ./backend ./
RUN ls
RUN npm install
#RUN mkdir ./src/db
#RUN touch ./src/db/dev.db.sqlite
RUN npm run build

FROM node:alpine AS nodefrontend
RUN apk add --no-cache python make g++
WORKDIR /tygercaddy/frontend
COPY ./frontend ./
RUN npm install
RUN npm run build

FROM node:alpine AS tygercaddy
COPY --from=caddy /usr/bin/caddy /usr/bin/caddy

WORKDIR /tygercaddy/backend
COPY --from=nodebackend /tygercaddy/backend/build ./
COPY --from=nodebackend /tygercaddy/backend/node_modules ./node_modules

WORKDIR /tygercaddy/frontend
COPY --from=nodefrontend /tygercaddy/frontend/ ./
#COPY --from=nodefrontend /tygercaddy/frontend/node_modules ./node_modules


COPY /docker/start.sh /start.sh
COPY /docker/checkresponse.sh /checkresponse.sh
COPY /docker/caddyconfig.json /caddyconfig.json
RUN chmod +x /start.sh

EXPOSE 3000 8080 80 443

ENTRYPOINT ["sh", "/start.sh"]

CMD [run]