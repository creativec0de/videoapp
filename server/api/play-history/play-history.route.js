const express = require('express');

const router = express.Router();

const PlayHistoryController = require('./play-history.controller');

/** POST /api/play-histories/ - Create new play hisotry recored */
router.route('').post(PlayHistoryController.create);

/** GET /api/play-histories?userId=<UserId> Get list of user's play history */
router.route('').get(PlayHistoryController.list);

/** DELETE /api/play-histories/:id - delete single play history record */
router.route('/:id').delete(PlayHistoryController.delete);


module.exports = router;
