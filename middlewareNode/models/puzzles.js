const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// Schema with the attributes matching data provided by the lichess puzzles API
const puzzleSchema = new mongoose.Schema(
  {
    puzzleId: {
        type: String,
        required: true,
    },
    FEN: {
        type: String,
        required: true,
    },
    moves: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
    },
    ratingDeviation: {
        type: Number,
    },
    popularity: {
        type: Number,
    },
    nbPlays: {
        type: Number,
    },
    themes: {
        type: String,
    },
    gameUrl: {
        type: String,
    },
    openingTags: {
        type: String,
    },
  },
  { versionKey: false }
);

module.exports = puzzles = model("puzzles", puzzleSchema);