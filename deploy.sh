#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# cp README
cp README.md dist/README.md

# navigate into the build output directory
cd dist

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f https://github.com/bastienterrier/iGarden.git master:gh-pages

cd -