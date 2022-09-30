const express = require("express");
const router = express.Router();

// Route 1 : Sign up using email username and password
router.post("/signup", (req, res) => {});

// Route 2 : Login using email and password
router.get("/login", (req, res) => {});

// Route 3 : get all users
router.get("/getusers", (req, res) => {});

// Route 4 : get a user using uid
router.get("/getuser/:uid", (req, res) => {});

// Route 5 : Update user using uid
router.put("/updateuser/:uid", (req, res) => {});

// Route 6 : delete user using uid
router.delete("/deleteuser/:uid", (req, res) => {});

module.exports = router;
