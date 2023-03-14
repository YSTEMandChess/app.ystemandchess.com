const express = require("express");
const passport = require("passport");
const router = express.Router();
const crypto = require("crypto");
const { check, validationResult } = require("express-validator");
const timeTracking = require("../models/timeTracking");

// @route   POST /timeTracking/start
// @desc    POST a user's event for time tracking
// @access  Public with jwt Authentication
router.post("/start", passport.authenticate("jwt"), async (req, res) => {
    try{
      const {username, eventType} = req.query
      const eventId = uuidv4(); //Generate a random meetingId
  
      // Creating an event with required fields
      const newEvent = await timeTracking.create({
        username: username, 
        eventType: eventType,
        eventId: eventId,
        startTime: new Date(),
      });
  
      return res.status(200).json(newEvent);
    } catch (error) {
      console.error(error.message);
      res.status(500).json("Server error");
    }
  });
  
// @route   PUT /timeTracking/end
// @desc    PUT a user's event to an end
// @access  Public with jwt Authentication
router.put("/end", passport.authenticate("jwt"), async (req, res) => {
    try{
        const {username, eventType, eventId} = req.query
        let filters = {username: username, eventID: eventId, eventType: eventType}
        const currEvent = await timeTracking.findOne(filters);

        //Error checking to ensure the user is actually in a event
        if (!currEvent){
          return res.status(400).json("This event is currently not happening!")
        }
        // Saving end time 
        currEvent.endTime = new Date();
        await currEvent.save();

        return res.status(200).json("Ok");
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server error");
    }
});
  
module.exports = router;