#!/bin/bash

rm -r dist || echo 1

mkdir -p dist

cp ./src/* ./dist

 # first pass : mangle all var
env NODE_ENV=MANGLE_TOP_LEVEL ./node_modules/.bin/babel --plugins= -o ./dist/a.js ./src/a.js

 # second pass minify ( I failed to tweak the babelrc to do it in one pass )
env NODE_ENV=MINIFY ./node_modules/.bin/babel -o ./dist/a.js ./dist/a.js

cd dist

zip ../out.zip ./*

cd ..

mv ./out.zip ./dist

cp ./node_modules/aframe/gh-pages/dist/aframe-v0.6.1.min.js ./dist

stat --printf="%s\n" ./dist/out.zip

echo ok