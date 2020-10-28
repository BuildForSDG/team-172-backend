const JwtService = require('../services/jwt');
const { User } = require('../models');

module.exports = async (req, res, next) => {
  try {
    const { id } = await JwtService.getToken(req);

    if (id === undefined) {
      throw new Error('Invalid token: Token did not contain required fields');
    }

    const user = await User.findByPk(id);

    if (!user) {
      throw new Error('User Not Found');
    }

    req.user = { id: user.id };

    await next();
  } catch (error) {
    next(error);
  }
};
