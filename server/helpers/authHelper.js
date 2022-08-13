const bcrypt = require("bcrypt");

function hashPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(11, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (err, hashedPass) => {
        if (err) {
          reject(err);
        }
        resolve(hashedPass);
      });
    });
  });
}

function comparePassword(password, hashed) {
  return bcrypt.compare(password, hashed);
}

module.exports = {
  hashPassword,
  comparePassword
}