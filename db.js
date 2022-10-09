require("dotenv").config();
const mongoose = require("mongoose");

const connectToMongo = () => {
  mongoose.connect(process.env.DB_URL, (err) => {
    if (err) throw err;
    console.log(`Connected to Database`);
  });
};

module.exports = connectToMongo;
