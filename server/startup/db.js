const mongoose = require('mongoose');
const config = require('../core/config');
const logger = require('../core/logger');

module.exports = function db() {
  mongoose
    .connect(
      config.get('mongodbUri'),
      { useNewUrlParser: true },
    )
    .then(() => {
      logger.info('Connected to MongoDB');
    });
};
