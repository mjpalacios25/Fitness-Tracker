var mongoose = require("mongoose");
var db = require("../model");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitnessTracker", {
  useNewUrlParser: true
});

var workoutSeed = [
  {
    name: "Stationary Bike",
    date: new Date(Date.now())
  }
  
];

db.Workouts.deleteMany({})
  .then(() => db.Workouts.collection.insertMany(workoutSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
