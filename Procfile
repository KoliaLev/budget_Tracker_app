web: node ,
start: cross-env NODE_ENV=prodaction node app.js,
    server: nodemon app.js,
   client: npm run start --prefix client,
    client:install: npm install --prefix client,
    client:build: npm run build --prefix client,
    dev: cross-env NODE-ENV=development concurrently \"npm run server\" \"npm run client\"
