require("dotenv").config();
const jwt = require("jsonwebtoken");

const verify_user = (req, res, next) => {
  try {
    const data = jwt.verify(req.headers.authtoken, process.env.JWT_SECRET);

    if (req.params.uid === data.user.id) {
      next();
    } else {
      return res.send({ error: "un-authorised user" });
    }
  } catch (err) {
    console.log(err);
    return res.send({ error: "un-authorised user" });
  }
};

module.exports = verify_user;
