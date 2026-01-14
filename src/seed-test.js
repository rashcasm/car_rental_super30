require("dotenv").config();
const {prisma, connectDB, disconnectDB} = require("./config/prisma");

async function seedTest() {
  try {
    // 1. Create a user
    const user = await prisma.user.create({
      data: {
        username: "testuser",
        password: "hashed_password_for_now"
      }
    });

    console.log("User created:", user);

    // 2. Create a booking for that user
    const booking = await prisma.booking.create({
      data: {
        userId: user.id,
        carName: "Honda City",
        days: 3,
        rentPerDay: 1500,
        status: "booked"
      }
    });

    console.log("Booking created:", booking);

    // 3. Fetch all bookings
    const bookings = await prisma.booking.findMany({
      where: { userId: user.id }
    });

    console.log("Fetched bookings:", bookings);

  } catch (error) {
    console.error("Seed test failed:", error);
  } finally {
    await disconnectDB();
  }
}

seedTest();
