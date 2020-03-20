const router = require("express").Router();
const db = require("../models");


router.get("/api/workouts", (req, res) => {
    db.Workouts.find({})
        .then(dbNote => {
            res.json(dbNote);
        })
        .catch(err => {
            res.json(err);
        });
});

router.get("/api/exercises", (req, res) => {
    db.Exercise.find({})
        .then(dbNote => {
            res.json(dbNote);
        })
        .catch(err => {
            res.json(err);
        });
});

router.post("/api/workouts", ({ body }, res) => {
    db.Workouts.create(body)
        .then(dbTransaction => {
            res.json(dbTransaction);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.post("/submit", ({ body }, res) => {
    db.Exercise.create(body)
        .then(({ _id }) => db.Workouts.findOneAndUpdate({}, { $push: { notes: _id } }, { new: true }))
        .then(dbUser => {
            res.json(dbUser);
        })
        .catch(err => {
            res.json(err);
        });
});
