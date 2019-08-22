const error = require('../core/middleware/error');

const playHistoryRoute = require('../api/play-history/play-history.route');
const UserRoute = require('../api/user/user.route');
const { tokenAuth } = require('../auth/token-auth');

module.exports = function routes(app) {
  app.use('/api/play-histories', tokenAuth.required, playHistoryRoute);
  app.use('/api/users', UserRoute);
  app.use(error);
};
