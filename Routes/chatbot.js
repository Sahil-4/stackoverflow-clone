const express = require("express");
const chatbot = require("../Controllers/chatbot");

const router = express.Router();

// 1. handle chatbot queries
router.post("/query", chatbot.handleBot);

module.exports = router;
