require("dotenv").config();
const express = require("express");

// initializing app
const app = express();

// Connecting to Databse
require("./db")();

// configuration
app.use(
  require("cors")({
    origin: process.env.ORIGIN,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Listening routes
app.get("/", (req, res) => {
  res.send("Hello from server");
});

// users profile related routes
app.use("/api/user", require("./Routes/user"));

// questions and answer related routes
app.use("/api/question", require("./Routes/question"));

// starting server
app.listen(process.env.PORT, (err) => {
  console.log(`Server is running on port:${process.env.PORT}`);
});
