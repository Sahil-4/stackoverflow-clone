require("dotenv").config();
const express = require("express");

// initializing app
const app = express();

app.get("/", (req, res) => {
  res.send("Hello from server");
});

// starting server
app.listen(process.env.PORT, (err) => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
