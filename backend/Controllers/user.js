const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signup = async (req, res) => {
  try {
    // checking if user already exists
    const isUserExist = await User.findOne({ email: req.body.email });
    if (isUserExist) {
      return res.status(400).json({ error: "User already exists." });
    }

    // hashing password
    const salt = await bcrypt.genSalt(8);
    const sec_pass = await bcrypt.hash(req.body.password, salt);

    // creating new user
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: sec_pass,
    });

    // signing jwt
    const data = {
      user: {
        id: user.id,
      },
    };
    const authToken = jwt.sign(data, process.env.JWT_SECRET);

    // sending jwt
    console.log(`New user registered with authtoken : ${authToken}`);
    return res.json({ authToken });
  } catch (err) {
    console.log(err);
    return res.send({ error: "some unknown error occured" });
  }
};

exports.login = async (req, res) => {
  try {
    // checking if user exists or not
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // checking for wrong password
    const passwordCompare = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordCompare) {
      return res
        .status(400)
        .json({ error: "Looks like you may have entered wrong credentials." });
    }

    // signing jwt
    const data = {
      user: {
        id: user.id,
      },
    };

    // sending jwt
    const authToken = jwt.sign(data, process.env.JWT_SECRET);
    console.log(`${req.body.email} logged in with authToken : ${authToken}`);
    return res.json({ authToken });
  } catch (err) {
    console.log(err);
    return res.send({ error: "some unknown error occured" });
  }
};

exports.getusers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    return res.json(users);
  } catch (err) {
    console.log(err);
    return res.send({ error: "some unknown error occured" });
  }
};

exports.getuser = async (req, res) => {
  try {
    const user = await User.findById(req.params.uid).select("-password");
    if (!user) {
      return res.send({ error: "no user found" });
    }

    return res.send(user);
  } catch (err) {
    console.log(err);
    return res.send({ error: "some unknown error occured" });
  }
};

exports.updateuser = async (req, res) => {
  try {
    // checking if user exists
    const user = await User.findById(req.params.uid);
    if (!user) {
      return res.send({ error: "user not found" });
    }

    // checking for wrong password
    const passwordCompare = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordCompare) {
      return res.send({ error: "credentials not matched." });
    }

    // updating user data except password
    const user_new = req.body;
    delete user_new.password;
    await user.updateOne(user_new);
    return res.send({ message: "user updated" });
  } catch (err) {
    console.log(err);
    return res.send({ error: "some unknown error occured" });
  }
};

exports.deleteuser = async (req, res) => {
  try {
    const user = await User.findById(req.params.uid);
    if (!user) {
      return res.send({ error: "user not found" });
    }

    // checking for wrong password
    const passwordCompare = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordCompare) {
      return res.send({ error: "credentials not matched." });
    }

    // TODO : delete user
    await user.delete();
    return res.send({ message: "user deleted" });
  } catch (err) {
    console.log(err);
    return res.send({ error: "some unknown error occured" });
  }
};
