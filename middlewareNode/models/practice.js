const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const practiceSchema = new mongoose.Schema({
  practice_name: {
    type: String,
    required: true,
  },
  subpractice: [
    {
      subPracticeName: { type: String },
      startFen: { type: String },
      info: { type: String },
    },
  ],
});
module.exports = practice = model("practice", practiceSchema);
