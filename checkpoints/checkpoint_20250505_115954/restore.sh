#!/bin/bash

# Restore files from checkpoint
cp -r src/* ../src/
cp -r public/* ../public/
cp package.json ../
cp README.md ../

echo "Project restored from checkpoint!"
