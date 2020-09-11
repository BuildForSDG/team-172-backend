require('dotenv').config();

const http = require('http');
const app = require('./app');
const models = require('./src/models');

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || 3000;

const server = http.createServer(app);

models.sequelize.sync().then(function () {
  /**
   * Listen on provided port, on all network interfaces.
   */
  server.listen(port, () =>
    console.log(`\nServer is running on port ${port}!\n`)
  );
});
