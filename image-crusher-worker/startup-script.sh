#!/bin/sh

curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs

sudo apt-get update
sudo apt-get install -y git

git clone https://github.com/Platane/js13k-2017.git

cd js13k-2017/image-crusher-worker

npm install
npm run build

cd ../..

mv js13k-2017/image-crusher-worker /worker

cd /worker

nohup npm run start &
nohup npm run start &
nohup npm run start &
nohup npm run start &