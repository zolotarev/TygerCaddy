#!/bin/bash
#printf "\n Lets get this show on the road! \n"
TYGER_ROOT=/tygercaddy
TYGER_BACKEND=$TYGER_ROOT/backend
TYGER_FRONTEND=$TYGER_ROOT/frontend
TYGER_DB=$TYGER_BACKEND/db/database.sqlite
CADDYFILE=$TYGER_BACKEND/db/Caddyfile
JSON_STRING='window.configs = { \
  "VUE_APP_API_URL":"'"${VUE_APP_API_URL}"'", \
}'
sed -i "s@//CONFIGURATIONS_PLACEHOLDER@${JSON_STRING}@" $TYGER_FRONTEND/dist/index.html
#/usr/bin/caddy run --config /db/Caddyfile &
cd $TYGER_BACKEND && node ./index.js && sleep 10 &
/usr/bin/caddy run --config $CADDYFILE --adapter caddyfile
#npm run serve --prefix $TYGER_FRONTEND
#npm run start --prefix /tygercaddy/frontend