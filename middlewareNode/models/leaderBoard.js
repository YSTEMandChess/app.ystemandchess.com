const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const leaderboardSchema = new mongoose.Schema(
  {
    username: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
  },
  { versionKey: false }
);

module.exports = puzzles = model("leaderboard", leaderboardSchema);