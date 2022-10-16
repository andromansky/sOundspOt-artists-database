const router = require('express').Router();
const bcrypt = require('bcrypt');
const {
  User, UserGenre, UserInstrument, UserBand, Rating,
} = require('../../db/models');

router.get('/', async (req, res) => {
  const { userId } = req.session;
  try {
    if (userId) {
      const user = await User.findOne({
        where: { id: userId },
        attributes: [
          'id',
          'login',
          'email',
          'about',
          'latitude',
          'longitude',
          'contact',
          'photo',
        ],
        include: [
          User.Demo, User.Band,
          {
            model: UserInstrument,
            include: UserInstrument.Instrument,
          },
          {
            model: UserGenre,
            include: UserGenre.Genre,
          },
          {
            model: UserBand,
            include: UserBand.Band,
          },
          {
            model: Rating,
          },
        ],
      });

      res.json({ user });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});

// authorization

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (email.length < 1 || password.length < 1) {
    res.json({ error: 'Fill in all required fields' });
    return;
  }

  try {
    const findUser = await User.findOne({ where: { email } });
    if (findUser) {
      const isSame = await bcrypt.compare(password, findUser.password);
      if (isSame) {
        req.session.userId = findUser.id;
        const user = await User.findOne({
          where: { id: findUser.id },
          attributes: [
            'id',
            'login',
            'email',
            'about',
            'latitude',
            'longitude',
            'contact',
            'photo',
          ],
          include: [
            User.Demo, User.Band,
            {
              model: UserInstrument,
              include: UserInstrument.Instrument,
            },
            {
              model: UserGenre,
              include: UserGenre.Genre,
            },
            {
              model: UserBand,
              include: UserBand.Band,
            },
            {
              model: Rating,
              where: { userTargetId: findUser.id },
            },
          ],
        });
        res.json({ user });
      } else {
        res.json({ error: 'Invalid email or password' });
      }
    } else {
      res.json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});

// logout

router.delete('/signout', (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      res.json({ error: 'Failed to logout' });
      return;
    }
    res.clearCookie('user_sid');
    res.json({ error: null });
  });
});

// registration

router.post(('/reg'), async (req, res) => {
  const {
    login, email, password, photo,
  } = req.body;
  try {
    const userWithEmail = await User.findOne({ where: { email } });
    const userWithLogin = await User.findOne({ where: { login } });

    const regEx = /.+@.+\..+/;

    if (userWithEmail) {
      res.json({ error: 'User with this email already exists' });
    } else if (userWithLogin) {
      res.json({ error: 'User with this login already exists' });
    } else if (login.length === 0) {
      res.json({ error: 'Login cannot be zero length' });
    } else if (!regEx.test(email)) {
      res.json({ error: 'Wrong email format' });
    } else if (password.length < 6) {
      res.json({ error: 'Change your password! Length less than 6 characters' });
    } else {
      const hash = await bcrypt.hash(password, 10);
      const newUser = await User.create(
        {
          login,
          email,
          password: hash,
          about: null,
          latitude: 46.435845,
          longitude: 30.716970,
          contact: null,
          photo,
        },
      );
      req.session.userId = newUser.id;
      const user = await User.findOne({
        where: { id: newUser.id },
        attributes: [
          'id',
          'login',
          'email',
          'about',
          'latitude',
          'longitude',
          'contact',
          'photo',
        ],
        include: [
          User.Demo, User.Band, {
            model: UserInstrument,
            include: UserInstrument.Instrument,
          },
          {
            model: UserGenre,
            include: UserGenre.Genre,
          }, {
            model: UserBand,
            include: UserBand.Band,
          }, {
            model: Rating,
            // where: { userTargetId: newUser.id },
          },
        ],
      });
      res.json({ user });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = router;
