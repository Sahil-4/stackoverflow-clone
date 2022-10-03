const express = require("express");
const { check, validationResult } = require("express-validator");
const user = require("../Controllers/user");
const verify_login = require("../Middleware/verify_login");
const verify_user = require("../Middleware/verify_user");

const router = express.Router();

// Route 1 : Sign up using email username and password
router.post(
  "/signup",
  [
    check("username")
      .isLength({ min: 3 })
      .withMessage("Username must have minimum length of 3 characters.")
      .trim(),

    check("email")
      .isEmail()
      .withMessage("invalid email address")
      .normalizeEmail(),

    check("password")
      .isLength({ min: 8, max: 15 })
      .withMessage(
        "password length should be between 8-15 Alphanumeric characters"
      )
      .matches(/\d/)
      .withMessage("your password should have at least one number")
      .matches(/[!@#$%^&*(),.?":{}_-|<>]/)
      .withMessage("your password should have at least one sepcial character"),
  ],
  (req, res, next) => {
    const error = validationResult(req).formatWith(({ msg }) => msg);

    if (!error.isEmpty()) {
      res.status(422).json({ error: error.array() });
    } else {
      next();
    }
  },
  user.signup
);

// Route 2 : Login using email and password
router.get(
  "/login",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email address.")
      .normalizeEmail(),

    check("password")
      .isLength({ min: 8, max: 15 })
      .withMessage(
        "password length should be between 8-15 Alphanumeric characters"
      )
      .matches(/\d/)
      .withMessage("your password should have at least one number")
      .matches(/[!@#$%^&*(),.?":{}_-|<>]/)
      .withMessage("your password should have at least one sepcial character"),
  ],
  (req, res, next) => {
    const error = validationResult(req).formatWith(({ msg }) => msg);

    if (!error.isEmpty()) {
      res.status(422).json({ error: error.array() });
    } else {
      next();
    }
  },
  user.login
);

// Route 3 : get all users
router.get("/getusers", verify_login, user.getusers);

// Route 4 : get a user using uid
router.get("/getuser/:uid", verify_login, user.getuser);

// Route 5 : Update user using uid
router.put("/updateuser/:uid", verify_user, user.updateuser);

// Route 6 : delete user using uid
router.delete("/deleteuser/:uid", verify_user, user.deleteuser);

module.exports = router;
