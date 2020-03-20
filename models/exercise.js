const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  name: {
    type: String,
  },
  reps: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Exercises = mongoose.model("Exercises", exerciseSchema);

module.exports = Exercises;
