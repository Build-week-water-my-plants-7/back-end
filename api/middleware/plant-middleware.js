const Plants = require("../plants/plant-model");

const checkIfPlantinDb = (req, res, next) => {
  const { id } = req.params;
  Plants.findById(id).then();
};

module.exports = {
  checkIfPlantinDb,
};