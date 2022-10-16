const express = require('express');

const exampleRouter = express.Router();

exampleRouter.get('/', async (req, res) => {
  res.json(true);
});

module.exports = exampleRouter;
