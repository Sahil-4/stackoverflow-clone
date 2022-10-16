const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  keywords: {
    type: [String],
    required: true,
  },
  answer: {
    message: {
      type: String,
    },
    author: {
      type: Boolean,
      default: false,
    },
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Query = mongoose.model("chatbot_queries", schema);
module.exports = Query;
