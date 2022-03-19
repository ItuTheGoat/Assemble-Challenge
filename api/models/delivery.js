const mongoose = require("mongoose");
const { Schema } = mongoose;

const DeliverySchema = new Schema({
  _id: Schema.Types.ObjectId,
  packages: [
    {
      _id: Schema.Types.ObjectId,
      name: String,
      weight: Number,
      coordX: Number,
      coordY: Number,
      distance: Number,
      droneID: Schema.Types.ObjectId,
    },
  ],
});

module.exports = mongoose.model("DeliveryModel", DeliverySchema);
