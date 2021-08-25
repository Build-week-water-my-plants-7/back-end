const express = require("express");
const router = express.Router();
const Plants = require("./plant-model");


//get all plants in the database
router.get("/", (req, res) => {
  Plants.getAllPlants()
    .then((plant) => {
      res.status(201).json(plant);
    })
    .catch((err) => {
      res.json(err);
    });
});

//Get a plant by it's particular id
router.get("/:id", (req, res) => {
  const plant_id = req.params.id;
  Plants.findByPlantId(plant_id)
    .then((plants) => {
      res.status(201).json(plants);
    })
    .catch((err) => {
      res.status(401).json(err);
    });
});

//get all of a user's plants
router.get("/user/:id", (req, res) => {
  const user_id = req.params.id;
  Plants.findAllUsersPlants(user_id)
    .then((plants) => {
      res.status(201).json(plants);
    })
    .catch((err) => {
      res.status(401).json(err);
    });
});

//Create a plant
router.post("/", (req, res) => {
  const newPlant = req.body;
  Plants.insert(newPlant)
    .then((plant) => {
      res.status(201).json(plant);
    })
    .catch((err) => {
      res.status(401).json("Error creating that plant", err.message);
    });
});

//update a plant
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  Plants.update(id, changes)
    .then((plant) => {
      res.status(200).json(plant);
    })
    .catch((err) => {
      res.status(401).json(err);
    });
});

//delete a plant
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Plants.remove(id)
    .then((plant) => {
      res.status(201).json({ plant });
    })
    .catch((err) => {
      res.status(400).json({ message: "Could not delete Plant" });
    });
});

module.exports = router;