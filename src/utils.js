const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

function signToken(user) {
  const userData = user.toObject();
  delete userData.password;
  return jwt.sign(userData, process.env.JWT_SECRET);
}

module.exports = {
  signToken,
};
