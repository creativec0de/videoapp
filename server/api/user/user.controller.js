const jwt = require('jsonwebtoken');
const uniqid = require('uniqid');
const config = require('../../core/config');

const generateJWT = function generateJWT(userId, role) {
  const secret = config.get('jwtPrivateKey');
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60);
  const newToken = {
    userId,
    role,
  };
  if (this.role) {
    newToken.role = this.role;
  }
  return jwt.sign(newToken, secret);
};

class UserController {
  /**  generate a random unique id and return a sigend JWT tokn to allow anonymous users sign in */
  static anonymousSignIn(req, res) {
    const anonymousUserId = uniqid();
    const authToken = generateJWT(anonymousUserId, 'guest');
    return res.send({ authToken, userId: anonymousUserId });
  }
}

module.exports = UserController;
