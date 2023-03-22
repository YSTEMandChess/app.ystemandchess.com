const express = require("express");
const passport = require("passport");
const router = express.Router();
const timeTracking = require("../models/timeTracking");
const { v4: uuidv4 } = require("uuid");

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
// @desc    PUT a user's event to an end and update the total time
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
        // Saving to DB
        currEvent.endTime = new Date();
        // currEvent.totalTime = totalTime;
        await currEvent.save();

        return res.status(200).json("Ok");
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server error");
    }
});

// @route   GET /timeTracking/statistics
// @desc    GET all the user's events between two dates and sum the times for each event type
// @access  Public with jwt Authentication
router.get("/statistics", passport.authenticate("jwt"), async (req, res) => {
  try{
    const {username, startDate, endDate} = req.query
    // startDate: ISODate('2023-03-01T00:00:00.000Z')
    // endDate: ISODate('2023-04-01T00:00:00.000Z')
    const filters = {
      username: username,
      meetingStartTime: {
        $gte: new Date(startDate),
        $lt: new Date(endDate)
      }
    }

    const eventArray = await timeTracking.find(filters);
    const eventTimes = {
      username: username,
      "mentor": 0,
      "lesson": 0,
      "play": 0,
      "puzzle": 0,
      "website": 0,
    };

    for (const event of eventArray){
      // filling array with event total times based on Type
      if (event.startTime && event.endTime){
        eventTimes[event.eventType] += event.endTime - event.startTime;
      }
    }

    // Response: {username:String, websiteTime:number, lessonsTime:number,
    // puzzleTime:number, playTime:number, mentorTime:number, websiteTime:number}
    return res.status(200).json(eventTimes);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server error");
  }
});

module.exports = router;