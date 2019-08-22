const { createLogger, format, transports } = require('winston');

const { combine, colorize, simple } = format;

const logger = createLogger({
  format: format.json(),
  transports: [
    new transports.Console({
      level: 'info',
      format: combine(simple(), colorize()),
      handleExceptions: true,
    }),
  ],
  exitOnError: true,
});
module.exports = logger;
