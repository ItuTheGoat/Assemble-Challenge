const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// model import
const Drone = require("../models/drone");

// GET request
router.get("/", (req, res, next) => {
  Drone.find()
    .then((docs) => {
      console.log(docs);
      res.status(200).json({ numDocs: docs.length, drones: docs });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.message });
    });
});

// POST request
router.post("/", (req, res, next) => {
  // user input of the data.

  const drone = new Drone({
    _id: new mongoose.Types.ObjectId(),
    inTransit: false,
    numPackages: 0,
    deliveries: [{}],
    currentWeight: 0,
    timeToRefuel: 3600,
    totalTravelTime: 0,
  });

  // const drone = new Drone({
  //   _id: new mongoose.Types.ObjectId(),
  //   numPackages: req.body.numPackages,
  // });

  drone
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "New drone created.",
        newDrone: drone,
      });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

// GET request for one drone
router.get("/:id", (req, res, next) => {
  const { id } = req.params;

  // query to retrieve one drone
  Drone.findById(id)
    .exec()
    .then((doc) => {
      if (doc) {
        console.log(doc);
        res.status(200).json(doc);
      } else {
        res.status(404).json({ error: `Drone with ID ${id} does not exist` });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// I will use patch so that the data that is not updated will not be removed.
router.patch("/:id", (req, res, next) => {
  const { id } = req.params;
  res.send("update a drone with id:" + id);
});

module.exports = router;
