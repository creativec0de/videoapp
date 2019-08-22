const express = require('express');
const boom = require('express-boom');
const cors = require('cors');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');

module.exports = function init(app) {
  app.use(boom());
  app.use(cors());
  app.use(express.json());
  app.use(xss());
  app.use(mongoSanitize());
};
