/* eslint-disable max-len */
const express = require('express');

const bandsRouter = express.Router();
const {
  Band, BandGenre, UserBand, Genre,
} = require('../../db/models');

bandsRouter.get('/', async (req, res) => {
  try {
    const bands = await Band.findAll({ raw: true });
    const genres = await Genre.findAll({ raw: true });
    const bandsWithExtraStuff = await Promise.all(bands.map(async (band) => {
      let hisGenres = await BandGenre.findAll({ where: { bandId: band.id } }, { raw: true });
      hisGenres = await Promise.all(hisGenres.map(async (genre) => {
        const genr = await Genre.findOne({ where: { id: genre.dataValues.genreId } }, { raw: true });
        return genr.dataValues.genre;
      }));
      return {
        ...band,
        extraStuff: {
          hisGenres,
        },
      };
    }));

    res.json({
      bandsWithExtraStuff, genres,
    });
  } catch (error) {
    res.json(error.message);
  }
});

bandsRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const band = await Band.findOne({
      where: { id },
      include: [
        Band.Demo,
        Band.Creater,
        {
          model: BandGenre,
          include: BandGenre.Genre,
        },
        {
          model: UserBand,
          include: UserBand.User,
        },
      ],
    });
    res.json({ band });
  } catch (error) {
    res.json(error.message);
  }
});

bandsRouter.post('/search', async (req, res) => {
  const {
    filtersGenre, orderByName, inputText,
  } = req.body;
  const bands = await Band.findAll({ raw: true });
  const genres = await Genre.findAll({ raw: true });
  let bandsWithExtraStuff = await Promise.all(bands.map(async (band) => {
    let hisGenres = await BandGenre.findAll({ where: { bandId: band.id } }, { raw: true });
    hisGenres = await Promise.all(hisGenres.map(async (genre) => {
      const genr = await Genre.findOne({ where: { id: genre.dataValues.genreId } }, { raw: true });
      return genr.dataValues.genre;
    }));
    return {
      ...band,
      extraStuff: {
        hisGenres,
      },
    };
  }));
  bandsWithExtraStuff = bandsWithExtraStuff.filter((band) => {
    for (let i = 0; i < filtersGenre.length; i += 1) {
      if (filtersGenre[i]) {
        if (!band.extraStuff.hisGenres.includes(genres[i].genre)) return false;
      }
    }
    return true;
  });
  if (inputText) {
    bandsWithExtraStuff = bandsWithExtraStuff.filter((band) => band.name.toLowerCase().includes(inputText.toLowerCase()));
  }
  if (orderByName) {
    bandsWithExtraStuff = bandsWithExtraStuff
      .sort((band1, band2) => (band1.name > band2.name ? 1 : -1));
  }
  res.json({ bandsWithExtraStuff });
});

module.exports = bandsRouter;
