#!/bin/bash
rm -R /home/lee/apps/TygerCaddy
mkdir /home/lee/apps/TygerCaddy
cd /home/lee/apps/TygerCaddy
#git clone -b docker git@github.com:morph1904/TygerCaddy.git ./
git clone git@github.com:morph1904/TygerCaddy.git ./
docker build . -t morph1904/tygercaddy:test
docker tag morph1904/tygercaddy:dev
docker tag morph1904/tygercaddy:test registry.bytesense.biz/morph1904/tygercaddy:dev
docker tag morph1904/tygercaddy:test registry.tygercaddy.co.uk/tygercaddy/tygercaddy:test
docker push morph1904/tygercaddy:test
docker push registry.bytesense.biz/tyger:dev
docker push registry.tygercaddy.co.uk/tygercaddy/tygercaddy:test