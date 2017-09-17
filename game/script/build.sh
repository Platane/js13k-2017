#!/bin/bash

rm -r dist || echo 1

mkdir -p dist

cp ./src/* ./dist

./node_modules/.bin/babel -o ./dist/a.js ./src/a.js

cd src

# zip ../out.zip ./*

cd ..

# mv ./out.zip ./dist

cp ./node_modules/aframe/gh-pages/dist/aframe-v0.6.1.min.js ./dist

# stat --printf="%s\n" ./dist/out.zip

echo ok