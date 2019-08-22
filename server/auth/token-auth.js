const expressJwt = require('express-jwt');
const config = require('../core/config');

function getTokenFromHeader(req) {
  if (
    (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token')
    || (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
  ) {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
}

const tokenAuth = {
  required: expressJwt({
    secret: config.get('jwtPrivateKey'),
    requestProperty: 'user',
    getToken: getTokenFromHeader,
  }),
  optional: expressJwt({
    secret: config.get('jwtPrivateKey'),
    requestProperty: 'user',
    credentialsRequired: false,
    getToken: getTokenFromHeader,
  }),
};

module.exports.tokenAuth = tokenAuth;
