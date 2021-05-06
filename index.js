// Load environmental variables
require("dotenv").config();

// Packages loading
const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const mongoose = require("mongoose");

// Connect database
mongoose.connect(`${process.env.MONGODB_URI}/sustainEchoTest`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

// Server initialization
const app = express();
app.use(formidable());
app.use(cors());

// Load the routes
const dataArray = require("./routes/dataArray");
app.use(dataArray);

// Define the unknown route answer
app.all("*", (req, res) => {
  res.status(404).json({ message: "This route does not exists." });
});

// Launch server
app.listen(process.env.PORT, () => {
  console.log("Server launched");
});
