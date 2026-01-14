const express = require("express");
const { testBooking } = require("../controllers/bookings.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const { createBooking } = require("../controllers/bookings.controller");
const { getBookings } = require("../controllers/bookings.controller");
const { updateBooking } = require("../controllers/bookings.controller");
const { deleteBooking } = require("../controllers/bookings.controller");

const router = express.Router();
router.get("/test", testBooking);
router.post("/", authMiddleware, createBooking);
router.get("/", authMiddleware, getBookings);
router.put("/:bookingId", authMiddleware, updateBooking);
router.delete("/:bookingId", authMiddleware, deleteBooking);

module.exports = router;