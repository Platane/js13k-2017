#!/bin/bash

mkdir -p dist

# build get function
mkdir dist/get
cp -r lib/* dist/get/
cp -r node_modules dist/get/node_modules
cp package.json dist/get/package.json
echo "exports.run = function(data,res){var err;require('./module/get').run().catch(function(x){err=x}).then(function(x){res.send(err?err.toString():x)})}" >> dist/get/index.js