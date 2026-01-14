// test controller
const {prisma} = require("../config/prisma");

async function testBooking(req, res) {
  res.send("Bookings testbooking controller is working");
}

/**
 * POST /bookings
 */
async function createBooking(req, res) {
  try {
    const { carName, days, rentPerDay } = req.body;
    const { userId } = req.user;

    // invalid inputs
    if (!carName || !days || !rentPerDay) {
      return res.status(400).json({
        success: false,
        error: "invalid inputs",
      });
    }

    if (days >= 365 || rentPerDay > 2000) {
      return res.status(400).json({
        success: false,
        error: "invalid inputs",
      });
    }

    const totalCost = days * rentPerDay;

    const booking = await prisma.booking.create({
      data: {
        userId,
        carName,
        days,
        rentPerDay,
        status: "booked",
      },
    });

    return res.status(201).json({
      success: true,
      data: {
        message: "Booking created successfully",
        bookingId: booking.id,
        totalCost,
      },
    });
  } catch (error) {
    console.error("CREATE BOOKING ERROR:", error);
    return res.status(500).json({
      success: false,
      error: "Something went wrong",
    });
  }
}

/**
 * GET /bookings
 */
async function getBookings(req, res) {
  try {
    const { bookingId, summary } = req.query;
    const { userId, username } = req.user;

    // 1️⃣ SUMMARY MODE
    if (summary === "true") {
      const bookings = await prisma.booking.findMany({
        where: {
          userId,
          status: {
            in: ["booked", "completed"],
          },
        },
      });

      const totalBookings = bookings.length;
      const totalAmountSpent = bookings.reduce(
        (sum, b) => sum + b.days * b.rentPerDay,
        0
      );

      return res.status(200).json({
        success: true,
        data: {
          userId,
          username,
          totalBookings,
          totalAmountSpent,
        },
      });
    }

    // 2️⃣ SINGLE BOOKING MODE
    if (bookingId) {
      const booking = await prisma.booking.findFirst({
        where: {
          id: Number(bookingId),
          userId,
        },
      });

      if (!booking) {
        return res.status(404).json({
          success: false,
          error: "bookingId not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: [
          {
            id: booking.id,
            car_name: booking.carName,
            days: booking.days,
            rent_per_day: booking.rentPerDay,
            status: booking.status,
            totalCost: booking.days * booking.rentPerDay,
          },
        ],
      });
    }

    // 3️⃣ NORMAL LIST MODE
    const bookings = await prisma.booking.findMany({
      where: { userId },
    });

    const response = bookings.map((b) => ({
      id: b.id,
      car_name: b.carName,
      days: b.days,
      rent_per_day: b.rentPerDay,
      status: b.status,
      totalCost: b.days * b.rentPerDay,
    }));

    return res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.error("GET BOOKINGS ERROR:", error);
    return res.status(500).json({
      success: false,
      error: "Something went wrong",
    });
  }
}


module.exports = { testBooking, createBooking, getBookings };