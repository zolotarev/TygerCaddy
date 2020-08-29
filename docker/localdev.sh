#!/bin/bash
rm -R /home/lee/apps/TygerCaddy
mkdir /home/lee/apps/TygerCaddy
cd /home/lee/apps/TygerCaddy
git clone -b docker git@github.com:morph1904/TygerCaddy.git ./
docker build . -t tyger:dev