const express = require('express');
const { Client } = require('pg');
const { app: { port }, db } = require('./config');

(async (app, db, config) => {
  const { port } = config;
  await db.connect();

  app.get('/', (req, res) => {
    res.send('Home');
  });

  app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const data = await db.query(`select * from users where id = ${id}`);
      if (!data.rows.length) return res.status(404).send('Not found');

      return res.json(data.rows[0]);
    } catch ({ message }) {
      return res.status(500).send(message);
    }
  });

  app.get('/health', (req, res) => res.send('OK'));

  const server = app.listen(port, () => {
    console.info(`Server listening on port ${port}...`);
  });

  process.on('unhandledRejection', (reason) => {
    console.error(`Unhandled rejection ${reason}`);
  });

  ['SIGINT', 'SIGTERM'].forEach((signal) => process.on(signal, () => {
    db.end();
    console.info(`Server recieves signal ${signal}`);
    process.exit(0);
  }));
})(
  express(),
  new Client(db),
  { port }
);
