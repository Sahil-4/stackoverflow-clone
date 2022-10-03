require("dotenv").config();
const jwt = require("jsonwebtoken");

const verify_author = (req, res, next) => {
  try {
    if (!req.headers.authtoken) {
      return res.send({ error: "un-authorised user" });
    }

    const data = jwt.verify(req.headers.authtoken, process.env.JWT_SECRET);
    req.headers.uid = data.user.id;
    next();
  } catch (err) {
    console.log(err);
    return res.send({ error: "un-authorised user" });
  }
};

module.exports = verify_author;
