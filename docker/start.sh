#!/bin/bash
printf "Starting Caddy\n"
/usr/bin/caddy run &
npm run start --prefix /tygercaddy/backend &
npm run dev --prefix /tygercaddy/frontend


