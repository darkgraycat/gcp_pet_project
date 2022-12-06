const express = require('express');
const { Client } = require('pg');

const { app: { port }, db } = require('./config');

const app = express();
const client = new Client(db);

app.get('/', (req, res) => {
  res.send('Autodeploy 2');
});

app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await client.connect();
    const user = await client.query(`select * from users where id = ${id}`);
    await client.end();

    return res.json(user);
  } catch ({ message }) {
    return res.status(500).send(message);
  }
});

app.get('health', (req, res) => res.send('OK'));

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled rejection', reason.stack);
});
