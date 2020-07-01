#!/bin/bash
printf "Starting Caddy\n"
/usr/bin/caddy run &
node /tygercaddy/backend/index.js &
npm run start --prefix /tygercaddy/frontend


