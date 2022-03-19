const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// We need the Drone Model and the Delivery model
const DroneModel = require("../models/drone");
const DeliveryModel = require("../models/delivery");

router.post("/", (req, res) => {
  // Variable to store the available drone's ID.
  var droneID = null;

  // First check if there is an available Drone
  DroneModel.findOne({ deliveries: [{}] })
    .exec()
    .then((doc) => {
      if (doc) {
        const { id } = doc;
        droneID = id;
        console.log("Drone found");
        deliveryQuery(droneID);
      } else {
        res
          .status(404)
          .json({ error: `No drones avilable, register a new drone.` });
      }
    });

  // Calculate the distance to the destination
  const distance = (x, y) => {
    // To get the destination, we need the
    var distanceSquare = x ** 2 + y ** 2;
    var result = Math.sqrt(distanceSquare);
    return result.toFixed(2);
  };

  // Query to add the packages
  const deliveryQuery = (droneID) => {
    const { packages } = req.body;
    const deliveryModel = new DeliveryModel({
      _id: new mongoose.Types.ObjectId(),
      packages: packages.map((package) => {
        return {
          _id: new mongoose.Types.ObjectId(),
          name: package.name,
          weight: package.weight,
          coordX: package.coordX,
          coordY: package.coordY,
          distance: distance(package.coordX, package.coordY),
          droneID,
        };
      }),
    });

    deliveryModel
      .save()
      .then((result) => {
        console.log(result);
        res.status(201).json({
          message: "New package(s) added.",
          newPackages: deliveryModel,
        });
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  };
});

// GET all the packages
router.get("/", (req, res) => {
  DeliveryModel.find()
    .then((docs) => {
      if (docs) {
        res.status(200).json(
          docs.map((doc) => {
            return {
              numPackages: doc.packages.length,
              packages: doc.packages,
            };
          })
        );
      }
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

module.exports = router;
