const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
console.log("ENV CHECK:", process.env.MONGO_URL);
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.post("/register", (req, res) => {
  res.json({ message: "Register API working" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});