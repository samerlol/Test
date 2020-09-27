"use strict";
const express = require("express");

const User = express.Router();

const userController = require("../Controllers/User");
const userProfileController = require("../Controllers/userProfile");

User.use(function timeLog(req, res, next) {
  console.log(req.url, "@ Time: ", Date.now());
  next();
});

//find UserProfile by his ID.
User.get("/", userProfileController.findOneByID);

//Delete One User if the Email is not empty.
User.delete("/", userController.delete);

//Get All users with specific Type.
User.get("/all", userController.findAllByType);

//Create a User.
User.post("/create", userController.create);

//Update More than One User.
User.put("/updatelist", userController.update);

module.exports = User;
