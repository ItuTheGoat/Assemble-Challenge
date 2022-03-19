const mongoose = require("mongoose");
const { Schema } = mongoose;

const droneSchema = new Schema({
  _id: Schema.Types.ObjectId,
  inTransit: Boolean,
  numPackages: Number,
  deliveries: Array, // Array of objects with each package and delivery information.
  currentWeight: Number,
  timeToRefuel: Number,
  totalTravelTime: Number,
});

// const droneSchema = new Schema({
//   _id: Schema.Types.ObjectId,
//   numPackages: String,
// });

module.exports = mongoose.model("Drone", droneSchema);
