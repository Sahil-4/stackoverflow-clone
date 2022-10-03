require("dotenv").config();
const jwt = require("jsonwebtoken");

const verify_login = (req, res, next) => {
  try {
    jwt.verify(req.headers.authtoken, process.env.JWT_SECRET);
    next();
  } catch (err) {
    console.log(err.message);
    return res.send({ error: "un-authorised user" });
  }
};

module.exports = verify_login;
