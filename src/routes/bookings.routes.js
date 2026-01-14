const express = require("express");
const { testBooking } = require("../controllers/bookings.controller");

const router = express.Router();
router.get("/test", testBooking);

module.exports = router;