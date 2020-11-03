#!/bin/bash
TYGER_ROOT=/tygercaddy
TYGER_BACKEND=$TYGER_ROOT/backend
TYGER_FRONTEND=$TYGER_ROOT/frontend
TYGER_DB=$TYGER_BACKEND/db/database.sqlite
CADDYFILE=$TYGER_BACKEND/db/Caddyfile
JSON_STRING='window.configs = { \
  "VUE_APP_API_URL":"'"${VUE_APP_API_URL}"'", \
}'
sed -i "s@// CONFIGURATIONS_PLACEHOLDER@${JSON_STRING}@" $TYGER_FRONTEND/dist/index.html
if [ -e $CADDYFILE ]
then
printf "\n Caddyfile is readable! \n"
else
echo "{ 
 	 http_port 80 
 	 https_port 443 

 	 auto_https disable_redirects 
 } 
:{$FRONTEND_PORT} { 
 	 root * /tygercaddy/frontend/dist 
 	 root * /tygercaddy/frontend/dist 
 	 encode gzip zstd 
 	 try_files {path} {path}/ /index.html 
 	 file_server 
 } " > $CADDYFILE
fi

cd $TYGER_BACKEND && node ./index.js && sleep 10 &
/usr/bin/caddy run --config $CADDYFILE --adapter caddyfile