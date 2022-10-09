const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  question_title: {
    type: String,
    required: true,
  },
  question_body: {
    type: String,
    required: true,
  },
  question_tags: {
    type: [String],
    required: true,
  },
  question_author: {
    name: String,
    id: mongoose.Schema.Types.ObjectId,
  },
  question_total_votes: [mongoose.Schema.ObjectId],
  question_total_answers: [
    new mongoose.Schema({
      answer_body: {
        type: String,
        required: true,
      },
      answer_author: {
        uid: { type: mongoose.Schema.ObjectId, required: true },
        name: { type: String, required: true },
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    }),
  ],
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Question = mongoose.model("questions", schema);
module.exports = Question;
