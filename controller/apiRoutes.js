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
    db.exercise.create(body)
        .then(({ _id }) => db.workouts.findOneAndUpdate({}, { $push: { notes: _id } }, { new: true }))
        .then(dbUser => {
            res.json(dbUser);
        })
        .catch(err => {
            res.json(err);
        });
});

router.get("/populatedWorkout/:workoutID", (req, res) => {
    db.workouts.find({_id: req.params.workoutID})
      .populate("exercies") //play with word... name of file or model?
      .then(dbUser => {
        res.json(dbUser);
      })
      .catch(err => {
        res.json(err);
      });
  });

module.exports = router;