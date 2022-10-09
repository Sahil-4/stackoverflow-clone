const express = require("express");
const question = require("../Controllers/question");
const verify_author = require("../Middleware/verify_author");
const { check, validationResult } = require("express-validator");

const router = express.Router();

// ROUTE 1 : post a question
router.post(
  "/ask",
  [
    check("question_title")
      .isLength({ min: 7 })
      .withMessage("question title length should be minimum 7 characters"),

    check("question_body")
      .isLength({ min: 15 })
      .withMessage("question body length should be minimum 10 characters"),

    check("question_author.id").isMongoId().withMessage("not a valid author"),
  ],
  (req, res, next) => {
    const error = validationResult(req).formatWith(({ msg }) => msg);

    if (!error.isEmpty()) {
      res.status(422).json({ error: error.array() });
    } else {
      next();
    }
  },
  verify_author,
  question.ask
);

// ROUTE 2 : get all questions
router.get("/questions", question.questions);

// ROUTE 3 : get a single question using uid
router.get("/question/:quid", question.question);

// ROUTE 4 : upvote or downvote a question
router.patch("/vote/:quid", verify_author, question.vote);

// ROUTE 5 : add an answer using question uid
router.put("/answer/:quid", verify_author, question.answer);

// ROUTE 6 : delete an answer using uid of question and answer
router.patch("/delete/:quid/:auid", verify_author, question.deleteAnswer);

// ROUTE 7 : delete a question using uid
router.delete("/delete/:quid", verify_author, question.deleteQuestion);

module.exports = router;
