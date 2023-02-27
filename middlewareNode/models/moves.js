const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const movesSchema = new mongoose.Schema(
  {
    gameId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
    },
    moves: {
      type: Array,
      default: [],
    },
    ipAddress: {
      type: String,
    },
  },
  { versionKey: false }
);

module.exports = gameMoves = model("gameMoves", movesSchema, "gameMoves");
