const jwt = require("jsonwebtoken");
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

// create token
function generateToken(userId, username) {
  return jwt.sign(
    {
      userId: userId,
      username: username,
    },
    JWT_SECRET
  );
}

// verify token
function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = {
  generateToken,
  verifyToken,
};