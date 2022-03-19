// This page is unused because the endpoint was redundant
const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("get all packages");
});

router.post("/", (req, res, next) => {
  res.send("create a package");
});

module.exports = router;
