require("dotenv").config();
const { generateToken, verifyToken } = require("./utils/jwt");

const token = generateToken(1, "rahul");
console.log("TOKEN:", token);

const decoded = verifyToken(token);
console.log("DECODED:", decoded);
