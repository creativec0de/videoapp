const Joi = require('joi');
const mongoose = require('mongoose');

const PlayHistorySchema = new mongoose.Schema(
  {
    videoId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
);

function validatePlayHistory(playHistoryData) {
  const schema = {
    id: Joi.string().optional(),
    videoId: Joi.string().required().max(100),
    title: Joi.string().required().max(500),
    userId: Joi.string().optional().max(100),
  };
  return Joi.validate(playHistoryData, schema);
}

const PlayHistory = mongoose.model('PlayHistory', PlayHistorySchema);
exports.validate = validatePlayHistory;
exports.PlayHistory = PlayHistory;
