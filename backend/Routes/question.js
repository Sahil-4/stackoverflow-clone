const express = require("express");

const router = express.Router();

// ROUTE 1 : post a question
router.post("/ask", (req, res) => {});

// ROUTE 2 : get all questions
router.get("/questions", (req, res) => {});

// ROUTE 3 : get a single question using uid
router.get("/question/:quid", (req, res) => {});

// ROUTE 4 : upvote or downvote a question
router.patch("/vote/:quid", (req, res) => {});

// ROUTE 5 : add an answer using question uid
router.put("/answer/:quid", (req, res) => {});

// ROUTE 6 : delete an answer using uid of question and answer
router.put("/delete/:quid/:auid", (req, res) => {});

// ROUTE 7 : delete a question using uid
router.delete("/delete/:quid", (req, res) => {});

module.exports = router;
