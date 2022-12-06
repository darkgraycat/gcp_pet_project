const express = require('express');
const { app: { port } } = require('./config');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello GCP and autodeploy!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
