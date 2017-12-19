#!/bin/bash

rm -r dist || echo 1

mkdir -p dist

# build get function
mkdir dist/get
cp -r lib/* dist/get/
cp -r node_modules dist/get/node_modules
cp package.json dist/get/package.json
echo "exports.run = require('./util/functionWrapper')(require('./get'))" >> dist/get/index.js

# publishToStorage  function
mkdir dist/publishToStorage
cp -r lib/* dist/publishToStorage/
cp -r node_modules dist/publishToStorage/node_modules
cp package.json dist/publishToStorage/package.json
echo "exports.run = require('./util/functionWrapper')(require('./publishToStorage'))" >> dist/publishToStorage/index.js

# build create function
mkdir dist/create
cp -r lib/* dist/create/
cp -r node_modules dist/create/node_modules
cp package.json dist/create/package.json
echo "exports.run = require('./util/functionWrapper')(require('./create'))" >> dist/create/index.js