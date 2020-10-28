require('dotenv').config();

const http = require('http');
const app = require('./app');

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || 3000;

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () =>
  // eslint-disable-next-line no-console
  console.log(`\nServer is running on port ${port}!\n`)
);
