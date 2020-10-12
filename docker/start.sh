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
sed -i "s@// CONFIGURATIONS_PLACEHOLDER@${JSON_STRING}@" $TYGER_FRONTEND/dist/index.html

#cat $TYGER_FRONTEND/dist/index.html


#printf "\n OK, so I know where the files are stored, let me check some stuff.... \n"
if [ -e $CADDYFILE ]
then 
printf "\n Caddyfile is readable! \n"
else
echo "{ }" > $CADDYFILE
fi
if [ -e $TYGER_DB ]
then
printf "\n I've checked to see if you have a db, that means that I've seen you before, and I can see it! Hello Again! \n"
else
printf "\n I can not see that there is an existing db, that must mean that we've just met, let me create the db so that I can remember you.. \n"
cp $TYGER_BACKEND/initialdb/database.sqlite $TYGER_BACKEND/db/
printf "\n OK, thats the db created, let me just check again.... \n"
fi
if [ -e $TYGER_DB ]
then
printf "\n Yup it's there! I am TygerCaddy by the way. I just have to do a few more things.... \n"
else
printf "\n Oh No! something is not right here. I am going to have to shut down until you fix this, the problem is that the db is not where I need it to be..... \n"
exit 1
fi
#printf "\n OK, TygerCaddy is made up of three things, lets get these sorted now.... \n"
#printf "\n Starting Caddy, This does all the magic proxy and SSL stuff.... \n"
#printf "\n Now I am starting the backend, this talks to Caddy, and stores all of the stuff.... \n"
#printf "\n Last thing I am starting the frontend, this gives you a pretty front end do do what you need.... \n"
printf "\n OK, I have kicked all that off, going to sleep now, if any of the services have an issue, they will tell you directly..... \n"
#/usr/bin/caddy run --config /db/Caddyfile &
cd $TYGER_BACKEND && node ./index.js && sleep 10 &
/usr/bin/caddy run --config $CADDYFILE --adapter caddyfile &
#npm run serve --prefix $TYGER_FRONTEND
#npm run start --prefix /tygercaddy/frontend