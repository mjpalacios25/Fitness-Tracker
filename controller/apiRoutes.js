const router = require("express").Router();
const db = require("../models");

router.post("/api/workouts", ({ body }, res) => {
    db.Workouts.create(body)
      .then(dbTransaction => {
        res.json(dbTransaction);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });
