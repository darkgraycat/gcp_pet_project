const express = require('express');
const mysql = require('mysql2/promise');

const { app: { port }, db } = require('./config');
const routes = require('./routes');

console.warn(JSON.stringify(db));

(async (app, port, db_config) => {
  // connect to database
  const connection = await mysql.createConnection(db_config);

  // setup routes
  routes(app, connection);

  // start server
  app.listen(port, () => {
    console.info(`Server listening on port ${port}`);
  });

  // handle unhandled rejections
  process.on('unhandledRejection', (reason) => {
    console.error(`Unhandled rejection ${reason}`);
  });

  // listen to termination signals
  ['SIGINT', 'SIGTERM'].forEach((signal) => process.on(signal, () => {
    connection.end();
    console.info(`Server recieves signal ${signal}`);
    process.exit(0);
  }));
})(
  express(),
  port,
  db,
);
