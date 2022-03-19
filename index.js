const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

// env variables
const { MONGO_USER, MONGO_PASSWORD } = require("./config");

const PORT = 5000;

mongoose
  .connect(
    "mongodb+srv://" +
      MONGO_USER +
      ":" +
      MONGO_PASSWORD +
      "@mycluster.wawaa.mongodb.net/assembleTest?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Mongo DB connection successful");
  })
  .catch((err) => {
    console.log(err);
  });

const dronesRoute = require("./api/routes/drones");
const deliveriesRoute = require("./api/routes/delivery");
// const packagesRoute = require("./api/routes/packages");

// Need to ensure the data

// linking the body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Adding CORS headers
app.use(cors());
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authrization"
//   );
//   if (req.method === "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "PUT, PATCH, GET, POST, DELETE");
//     return res.status(200).json({});
//   }
// });

// Test if server is working
app.get("/", (req, res) => res.send("Hello world"));

app.use("/api/drones", dronesRoute);
app.use("/api/deliveries", deliveriesRoute);
// app.use("/api/packages", packagesRoute);

app.listen(PORT, () => console.log(`Hello world, listening from port ${PORT}`));
