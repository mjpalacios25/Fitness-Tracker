var mongoose = require("mongoose");
var db = require("../models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitnessDB", {
  useNewUrlParser: true
});

var workoutSeed = [
  {
    name: "Treadmill",
    date: new Date(Date.now())
  }
  
];

db.workouts.deleteMany({})
  .then(() => db.workouts.collection.insertMany(workoutSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
