const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const practice = require("../models/practice");
const practiceLessons = require("../utils/practiceconstant");
const { Passport } = require("passport");

router.post("/addpractices", passport.authenticate("jwt"), async (req, res) => {
  try {
    const getPractices = await practice.find();
    const totalPractices = getPractices.length;
    for (let i = totalPractices; i < practiceLessons.length; i++) {
      await practice.create({
        practice_name: practiceLessons[i].practice_name,
        subpractice: practiceLessons[i].subpractice,
      });
      res.status(200).send("Added succesfully");
    }
    res.status(404).send("No more data to add");
  } catch (error) {
    console.log(error);
  }
});
router.get("/getpractices", async (req, res) => {
  try {
    const getPractices = await practice.find();
    res.status(200).send(getPractices);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
