const { User } = require('../db/models');

module.exports = async function userTracking(req, res, next) {
  if (req.session && req.session.user) {
    res.locals.user = await User.findByPk(req.session.user);
  }
  next();
};
