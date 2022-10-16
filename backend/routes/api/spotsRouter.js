const express = require('express');

const spotsRouter = express.Router();
const { Spot } = require('../../db/models');
const { SpotPhoto } = require('../../db/models');

spotsRouter.get('/', async (req, res) => {
  try {
    const spots = await Spot.findAll();
    const spotsWithPhoto = await Promise.all(spots.map(async (spot) => {
      const { dataValues } = await SpotPhoto.findOne({ where: { spotId: spot.id } });
      return { ...spot, photo: dataValues.photo, name: spot.dataValues.name };
    }));
    res.json({ spotsWithPhoto });
  } catch (error) {
    res.json(error.message);
  }
});

spotsRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const spot = await Spot.findOne({
      where: { id },
      include: [
        Spot.SpotPhoto,
      ],
    });
    res.json({ spot });
  } catch (error) {
    res.json(error.message);
  }
});

module.exports = spotsRouter;
