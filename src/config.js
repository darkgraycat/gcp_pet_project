const app = {
  env: process.env.NODE_ENV || 'local',
  port: process.env.PORT || 8080,
  request_timeout: Number(process.env.REQUEST_TIMEOUT_MS) || 30000
};

const db = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

module.exports = {
  app,
  db,
};
