const express = require('express');
const logger = require('./core/logger');

const app = express();

require('./startup/init')(app);
require('./startup/db')();
require('./startup/routes')(app);

const port = 4000;
app.listen(port, () => {
  logger.info(`Listening on port ${port}...`);
  logger.info(`env: ${app.get('env')}`);
});
