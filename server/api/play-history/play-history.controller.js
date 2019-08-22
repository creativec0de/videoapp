const { PlayHistory, validate } = require('./play-history.model');

class PlayHistoryController {
  static async list(req, res) {
    const resultsLimit = 100;
    const queryObject = { userId: req.query.userId };

    const playHistory = await PlayHistory
      .find(queryObject)
      .limit(resultsLimit)
      .sort({ _id: -1 })
      .exec();
    return res.send(playHistory);
  }

  static async create(req, res, next) {
    try {
      const playHistoryData = req.body || {};
      playHistoryData.userId = req.user.userId;
      const { error } = validate(playHistoryData);
      if (error) return res.boom.badRequest(error.details[0].message);

      const playHistory = await new PlayHistory(playHistoryData).save();
      return res.send(playHistory);
    } catch (err) {
      return next(err);
    }
  }


  static async delete(req, res, next) {
    try {
      const result = await PlayHistory.deleteOne({ _id: req.params.id, userId: req.user.userId }).exec();
      return res.send(result);
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = PlayHistoryController;
