const jwt = require('jsonwebtoken');

function ensureAuthorization(req) {
  try {
    const receivedJwt = req.headers['authorization'];
    return jwt.verify(receivedJwt, process.env.PRIVATE_KEY).id;
  } catch (err) {
    return err;
  }
}

module.exports = ensureAuthorization;
