const bcrypt = require("bcryptjs");

function hashPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

function validatePassword(inputPassword, passwordDb) {
  return bcrypt.compareSync(inputPassword, passwordDb);
}

module.exports = { hashPassword, validatePassword };
