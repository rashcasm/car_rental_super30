const express = require("express");
const { testBooking } = require("../controllers/bookings.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const { createBooking } = require("../controllers/bookings.controller");
const { getBookings } = require("../controllers/bookings.controller");

const router = express.Router();
router.get("/test", testBooking);
router.post("/", authMiddleware, createBooking);
router.get("/", authMiddleware, getBookings);

module.exports = router;