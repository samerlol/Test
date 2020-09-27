const express = require("express");
const bodyParser = require("body-parser");
require("./src/database/connection");
require("dotenv").config();
const cors = require("cors");

// set port, listen for requests
const PORT = process.env.PORT || 8080;

// database
const db = require("./models");

const app = express();
var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const UserRoutes = require("./routes/Users");
app.use("/users/", UserRoutes);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Nodejs MYSQL sequelize  task." });
});

app.route("./Controllers/User.js");

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
