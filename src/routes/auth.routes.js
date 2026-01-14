const express = require("express");
const { testAuth } = require("../controllers/auth.controller");

const router = express.Router();
router.get("/test", testAuth);

module.exports = router;