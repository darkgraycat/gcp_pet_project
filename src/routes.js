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
};
