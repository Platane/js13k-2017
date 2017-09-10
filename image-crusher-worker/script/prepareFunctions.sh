#!/bin/bash

rm -r dist || echo 1

mkdir -p dist

# build function
mkdir dist/worker
cp -r lib/* dist/worker/
cp -r node_modules dist/worker/node_modules
cp package.json dist/worker/package.json
echo "exports.run = function(data,res){var err;require('./run').run().catch(function(x){err=x}).then(function(x){res.send(err?err.toString():x)})}" >> dist/worker/index.js