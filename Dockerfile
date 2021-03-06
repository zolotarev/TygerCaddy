#Prep the caddy image for the binary
FROM caddy:builder-alpine AS caddy

RUN xcaddy build \
    --with github.com/caddy-dns/digitalocean \
    --with github.com/caddy-dns/cloudflare \
    --with github.com/caddy-dns/route53 \
    --with github.com/caddy-dns/gandi

#Build the backend
FROM node:alpine AS nodebackend
RUN apk add --no-cache python make g++
WORKDIR /tygercaddy/backend
COPY ./backend ./
COPY ./backend/ormconfig.js ./
RUN npm install
RUN npm run build
COPY ./backend/ormconfig.js ./build/
COPY ./backend/prod.example.env /tygercaddy/backend/build/.env
WORKDIR /tygercaddy/backend/build
RUN npm run sync
RUN npm run migration:run
RUN mkdir -p /tygercaddy/backend/build/initialdb
RUN mv /tygercaddy/backend/build/db/database.sqlite /tygercaddy/backend/build/initialdb/


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
COPY --from=nodebackend /tygercaddy/backend/ormconfig.js ./ormconfig.js
COPY --from=nodebackend /tygercaddy/backend/prod.example.env ./.env

WORKDIR /tygercaddy/frontend
COPY --from=nodefrontend /tygercaddy/frontend/dist ./dist

COPY /docker/start.sh /start.sh
COPY /docker/checkresponse.sh /checkresponse.sh

RUN chmod +x /start.sh

EXPOSE 3000 3001 80 443

ENTRYPOINT ["sh", "/start.sh"]

CMD [run]