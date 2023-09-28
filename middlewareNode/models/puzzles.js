const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// Schema with the attributes matching data provided by the lichess puzzles API
const puzzleSchema = new mongoose.Schema(
  {
    PuzzleId: {
        type: String,
        required: true,
    },
    FEN: {
        type: String,
        required: true,
    },
    Moves: {
        type: String,
        required: true
    },
    Rating: {
        type: Number,
    },
    RatingDeviation: {
        type: Number,
    },
    Popularity: {
        type: Number,
    },
    NbPlays: {
        type: Number,
    },
    Themes: {
        type: String,
    },
    GameUrl: {
        type: String,
    },
    openingTags: {
        type: String,
    },
  },
  { versionKey: false }
);

module.exports = puzzles = model("puzzles", puzzleSchema);