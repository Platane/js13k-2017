#!/bin/bash

rm -r dist || echo 1

mkdir -p dist

# build get function
mkdir dist/get
cp -r lib/* dist/get/
cp -r node_modules dist/get/node_modules
cp package.json dist/get/package.json
echo "exports.run = require('./util/functionWrapper').wrap(require('./get').run)" >> dist/get/index.js

# build getJob function
mkdir dist/getJob
cp -r lib/* dist/getJob/
cp -r node_modules dist/getJob/node_modules
cp package.json dist/getJob/package.json
echo "exports.run = require('./util/functionWrapper').wrap(require('./getJob').run)" >> dist/getJob/index.js

# publishToStorage  function
mkdir dist/publishToStorage
cp -r lib/* dist/publishToStorage/
cp -r node_modules dist/publishToStorage/node_modules
cp package.json dist/publishToStorage/package.json
echo "exports.run = require('./util/functionWrapper').wrap(require('./publishToStorage').run)" >> dist/publishToStorage/index.js

# build create function
mkdir dist/create
cp -r lib/* dist/create/
cp -r node_modules dist/create/node_modules
cp package.json dist/create/package.json
echo "exports.run = require('./util/functionWrapper').wrap(require('./create').run)" >> dist/create/index.js

# build pushSolution function
mkdir dist/pushSolution
cp -r lib/* dist/pushSolution/
cp -r node_modules dist/pushSolution/node_modules
cp package.json dist/pushSolution/package.json
echo "exports.run = require('./util/functionWrapper').wrap(require('./pushSolution').run)" >> dist/pushSolution/index.js

# build migration function
mkdir dist/migration
cp -r lib/* dist/migration/
cp -r node_modules dist/migration/node_modules
cp package.json dist/migration/package.json
echo "exports.run = require('./migration')" >> dist/migration/index.js