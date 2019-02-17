#!/bin/bash

rm -r dist || echo 1

mkdir -p dist

cat ./src/index.html \
| sed '/constant\.js/d' \
| sed '/generatePaintings\.js/d' \
| sed '/generateMazeObject\.js/d' \
| sed '/loadMap\.js/d' \
| sed '/controls\.js/d' \
| sed 's|game\.js|a\.js|' \
> ./dist/index.html

cp ./src/map ./dist/map

# concat files
cat ./src/constant.js ./src/generatePaintings.js ./src/generateMazeObject.js ./src/loadMap.js ./src/game.js ./src/controls.js > ./dist/a.js

 # first pass : mangle all var
env NODE_ENV=MANGLE_TOP_LEVEL ./node_modules/.bin/babel --plugins= -o ./dist/a.js ./dist/a.js

 # second pass minify ( I failed to tweak the babelrc to do it in one pass )
env NODE_ENV=MINIFY ./node_modules/.bin/babel -o ./dist/a.js ./dist/a.js

cd dist

zip ../out.zip ./*

cd ..

mv ./out.zip ./dist

cp ./node_modules/aframe/gh-pages/dist/aframe-v*.min.js ./dist

echo `stat --printf="%s\n" ./dist/out.zip` of `expr 13 \* 1024`

echo ok