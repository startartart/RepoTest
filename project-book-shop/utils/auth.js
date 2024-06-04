const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

function ensureAuthorization(req) {
  try {
    const receivedJwt = req.headers['authorization'];

    if (receivedJwt) return jwt.verify(receivedJwt, process.env.PRIVATE_KEY).id;
    throw new ReferenceError('jwt must be provided.');
  } catch (err) {
    return err;
  }
}

module.exports = ensureAuthorization;
