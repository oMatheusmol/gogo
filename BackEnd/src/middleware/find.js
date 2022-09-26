/* eslint-disable consistent-return */

const findAll = async (req, res, next) => {
  try {
    await Vehicle.find({}).then((vehicles) => {
      req.vehicle = vehicles;
    }).catch(() => res.status(404).send('Vehicle was not found!'));

    next();
  } catch (e) {
    res.status(500).send('Connection fail!');
  }
};

const findOne = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.findOne(req.params);

    if (!vehicle) return res.status(404).send('Vehicle was not found!');

    req.vehicle = vehicle;

    next();
  } catch (e) {
    res.status(500).send('Connection fail!');
  }
};

const findById = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return res.status(500).send('Connection fail!');

    req.vehicle = vehicle;
    next();
  } catch {
    res.status(404).send('Vehicle was not found!');
  }
};

module.exports = { findOne, findAll, findById };
