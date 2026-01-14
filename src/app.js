const express = require("express");
const authRoutes = require("./routes/auth.routes");
const bookingsRoutes = require("./routes/bookings.routes");

const app = express();
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Car Rental Backend is running");
});

// Use routes
app.use("/auth", authRoutes);
app.use("/bookings", bookingsRoutes);

module.exports = app;

// ENDPOINTS NEEDED
// AUTH - signup(post), login(post)
// BOOKINGS - bookings(get/post/put/delete)
