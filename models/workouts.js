const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: "Enter a name for transaction"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Workouts = mongoose.model("Workouts", workoutSchema);

module.exports = Workouts;
