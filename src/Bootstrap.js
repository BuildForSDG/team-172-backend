const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');

class Bootstrap {
  constructor() {
    this.app = express();
    this.initMiddleware();
    this.initRoutes();
    this.handleErrors();
  }

  initMiddleware() {
    // enable CORS with restrictions
    this.app.use(cors());
    // log HTTP request
    this.app.use(morgan('dev'));
    // parse application/json
    this.app.use(bodyParser.json({ limit: '2mb' }));
    // parse application/x-www-form-urlencoded
    this.app.use(bodyParser.urlencoded({ limit: '2mb', extended: true }));
  }

  initRoutes() {
    this.app.use('/', routes);
  }

  handleErrors() {
    // catch 404 and forward to error handler
    this.app.use((req, res, next) => {
      const err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    // error handler
    this.app.use((err, req, res, next) => {
      res.status(err.status || 500);
      res.json({
        message: err.message,
        error: this.app.get('env') === 'development' ? err : {}
      });
    });
  }
}

module.exports = new Bootstrap().app;
