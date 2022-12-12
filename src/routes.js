module.exports = (app, db) => {
  app.get('/', (req, res) => {
    res.send('Home');
  });

  app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const [rows] = await db.query(`select * from users where id = ${id}`);
      if (!rows.length) return res.status(404).send('Not found');

      return res.json(rows[0]);
    } catch ({ message }) {
      return res.status(500).send(message);
    }
  });

  app.get('/health', (req, res) => res.send('OK'));

  app.get('/calculate/:operation/:a/:b', (req, res) => {
    const { operation, a, b } = req.params;
    if (!['add', 'substract', 'divide', 'multiply'].includes(operation)) return res.status(404).send('Operation not found');
    if ( operation === 'add') return res.status(200).send(`Result is ${+a + +b}`);
    if ( operation === 'substract') return res.status(200).send(`Result is ${+a - +b}`);
    if ( operation === 'divide') return res.status(200).send(`Result is ${+a / +b}`);
    if ( operation === 'multiply') return res.status(200).send(`Result is ${+a * +b}`);
    return res;
  })
};
