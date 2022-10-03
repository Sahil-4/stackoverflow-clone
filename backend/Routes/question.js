const express = require("express");
const question = require("../Controllers/question");
const verify_login = require("../Middleware/verify_login");
const verify_author = require("../Middleware/verify_author");

const router = express.Router();

// ROUTE 1 : post a question
router.post("/ask", verify_author, question.ask);

// ROUTE 2 : get all questions
router.get("/questions", verify_login, question.questions);

// ROUTE 3 : get a single question using uid
router.get("/question/:quid", verify_login, question.question);

// ROUTE 4 : upvote or downvote a question
router.patch("/vote/:quid", verify_author, question.vote);

// ROUTE 5 : add an answer using question uid
router.put("/answer/:quid", verify_author, question.answer);

// ROUTE 6 : delete an answer using uid of question and answer
router.put("/delete/:quid/:auid", verify_author, question.deleteAnswer);

// ROUTE 7 : delete a question using uid
router.delete("/delete/:quid", verify_author, question.deleteQuestion);

module.exports = router;
