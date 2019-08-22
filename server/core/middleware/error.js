const logger = require('../logger');

// eslint-disable-next-line no-unused-vars
module.exports = function error(err, req, res, next) {
  logger.error(err.message, err);
  return res.boom.serverUnavailable('Something failed!');
};
