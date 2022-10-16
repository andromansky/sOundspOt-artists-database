const express = require('express');
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userTracking = require('../middlewares/userTracking');

const sessionConfig = require('./sessionConfig');

module.exports = function config(app) {
  app.disable('x-powered-by');
  app.use(express.static(path.join(__dirname, '../../frontend/build')));
  app.use(express.static('mediastorage'));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(cookieParser());
  app.use(session(sessionConfig));
  app.use(cors());
  app.use(userTracking);
};
