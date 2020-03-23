const router = require("express").Router();
const db = require("../models");


router.get("/api/workouts", (req, res) => {
    db.workouts.find({})
        .then(workoutData => {
            console.log(workoutData);
            res.json(workoutData)
        })
        .catch(err => {
            res.json(err);
        });
});

router.get("/populatedWorkout/:workoutID", (req, res) => {
    db.workouts.find({_id: req.params.workoutID})
      .populate("exercises") //play with word... name of file or model?
      .then(dbUser => {
          console.log(dbUser)
        res.json(dbUser);
      })
      .catch(err => {
        res.json(err);
      });
  });

router.post("/api/workouts", ({ body }, res) => {
    db.workouts.create(body)
        .then(newWorkout => {
            res.json(newWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.post("/submit", ({ body }, res) => {
    let exerciseInfo = {
        name: body.name,
        reps: body.reps
    };
    console.log(body)
    console.log(exerciseInfo);
    db.exercise.create(exerciseInfo)
        .then(({ _id }) => db.workouts.findOneAndUpdate({_id: body.workout}, { $push: { exercises: _id } }, { new: true })) //insert workout ID somewhere
        .then(dbUser => {
            res.json(dbUser);
        })
        .catch(err => {
            res.json(err);
        });
});



module.exports = router;