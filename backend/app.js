/* eslint-disable no-console */
require('dotenv').config();

const express = require('express');
const path = require('path');
const { sequelize } = require('./db/models');
const config = require('./config/config');

const exampleRouter = require('./routes/api/exampleRouter');

const authRouter = require('./routes/api/authRouter');
const usersRouter = require('./routes/api/usersRouter');
const bandsRouter = require('./routes/api/bandsRouter');
const spotsRouter = require('./routes/api/spotsRouter');
const userRouter = require('./routes/api/userRouter');

const app = express();
config(app);

const PORT = process.env.PORT ?? 4000;

app.use('/', exampleRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/bands', bandsRouter);
app.use('/spots', spotsRouter);
app.use('/user', userRouter);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
  } catch (error) {
    console.log('Can`t connect to DB');
    console.log(error.message);
  }
});
