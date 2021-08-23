const express = require("express");
const router = express.Router();
const Species = require("./species-model");

router.get("/", (req, res) => {
  Species.find()
    .then((species) => {
      res.status(200).json(species);
    })
    .catch((err) => {
      res.status(401).json("Error in getting species due to ", err.message);
    });
});

module.exports = router;