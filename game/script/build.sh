#!/bin/bash

rm -r dist || echo 1

mkdir -p dist

cp ./src/* ./dist

./node_modules/.bin/babel -o ./dist/a.js ./src/a.js

cd src

zip ../out.zip ./*

cd ..

mv ./out.zip ./dist

echo ok