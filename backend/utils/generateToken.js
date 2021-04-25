const jwt = require('jsonwebtoken');

/**
 * @param {*} id - userID to add as a paylod
 * @return Object with id and secret
 */
const genrateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '15d'
  })
}

module.exports = genrateToken;