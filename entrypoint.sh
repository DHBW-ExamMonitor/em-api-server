#!/bin/sh -e
npm run migrate:deploy
exec node ./src/main.js
