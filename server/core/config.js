const _ = require('lodash');

const dotenv = require('dotenv');

dotenv.config();
const config = require('config');

_.forEach(config, (value, key) => {
  if (!value) {
    throw new Error(`FATAL ERROR: ${key} is not defined in config`);
  }
});

class PrivateConfig {
  static get(key) {
    return config.get(key);
  }
}

module.exports = PrivateConfig;
