const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signup = async (req, res) => {
  try {
    // checking if user already exists
    const isUserExist = await User.findOne({ email: req.body.email });
    if (isUserExist) {
      return res.status(400).send({ error: "User already exists." });
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
    const authtoken = jwt.sign(data, process.env.JWT_SECRET);

    // sending user profile
    const userProfile = {
      authtoken: authtoken,
      uid: user._id,
      avatar: user.avatar,
      username: user.username,
      email: user.email,
      watched_tags: user.watched_tags,
      about: user.about,
      timestamp: user.timestamp,
    };

    return res.json({ userProfile });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "some error occurred" });
  }
};

exports.login = async (req, res) => {
  try {
    // checking if user exists or not
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // checking for wrong password
    const passwordCompare = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordCompare) {
      return res.status(401).send({ error: "un-authorised user" });
    }

    // signing jwt
    const data = {
      user: {
        id: user.id,
      },
    };

    const authtoken = jwt.sign(data, process.env.JWT_SECRET);

    // sending user profile
    const userProfile = {
      authtoken: authtoken,
      uid: user._id,
      avatar: user.avatar,
      username: user.username,
      email: user.email,
      watched_tags: user.watched_tags,
      about: user.about,
      timestamp: user.timestamp,
    };

    return res.json({ userProfile });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "some error occurred" });
  }
};

exports.phonelogin = async (req, res) => {
  try {
    // find user by phone
    let user = await User.findOne({ email: req.body.phone });

    // if user not exists create new profile
    if (!user) {
      // creating new user
      user = await User.create({
        username: req.body.phone,
        email: req.body.phone,
        password: req.body.phone,
      });
    }

    // if user exists send userprofile
    // signing jwt
    const data = {
      user: {
        id: user.id,
      },
    };
    const authtoken = jwt.sign(data, process.env.JWT_SECRET);

    const userProfile = {
      authtoken: authtoken,
      uid: user._id,
      avatar: user.avatar,
      username: user.username,
      email: user.email,
      watched_tags: user.watched_tags,
      about: user.about,
      timestamp: Date.now(),
    };

    return res.json({ userProfile });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "some error occurred" });
  }
};

exports.getusers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    return res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "some error occurred" });
  }
};

exports.getuser = async (req, res) => {
  try {
    const user = await User.findById(req.params.uid).select("-password");
    if (!user) {
      return res.status(404).send({ error: "no user found" });
    }

    return res.send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "some error occurred" });
  }
};

exports.updateuser = async (req, res) => {
  try {
    // checking if user exists
    const user = await User.findById(req.params.uid);
    if (!user) {
      return res.status(404).send({ error: "no user found" });
    }

    // checking for wrong password
    const passwordCompare = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordCompare) {
      return res.status(401).send({ error: "un-authorised user" });
    }

    // updating user data except password
    const user_new = req.body;
    delete user_new.password;
    await user.updateOne(user_new);

    // signing jwt
    const data = {
      user: {
        id: user.id,
      },
    };

    const authtoken = jwt.sign(data, process.env.JWT_SECRET);

    // sending user profile
    const userProfile = {
      authtoken: authtoken,
      uid: user._id,
      avatar: user_new.avatar || user.avatar,
      username: user_new.username || user.username,
      email: user_new.email || user.email,
      watched_tags: user_new.watched_tags || user.watched_tags,
      about: user_new.about || user.about,
      timestamp: user.timestamp || user.timestamp,
    };

    return res.json({ userProfile });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "some error occurred" });
  }
};

exports.deleteuser = async (req, res) => {
  try {
    const user = await User.findById(req.params.uid);
    if (!user) {
      return res.status(404).send({ error: "no user found" });
    }

    // checking for wrong password
    const passwordCompare = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordCompare) {
      return res.status(401).send({ error: "un-authorised user" });
    }

    await user.delete();
    return res.send({ message: "user deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "some error occurred" });
  }
};
