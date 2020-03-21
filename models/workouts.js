const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: "Enter a name for transaction"
  },
  exercises: [
    {
    type: Schema.Types.ObjectId,
    ref: "exercise"
  }
],
  date: {
    type: Date,
    default: Date.now
  }
});

const workouts = mongoose.model("workout", workoutSchema);

module.exports = workouts;
