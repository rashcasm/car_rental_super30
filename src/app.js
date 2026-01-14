const express = require("express");
const bookingsRoutes = require("./routes/bookings.routes");
const authRoutes = require("./routes/auth.routes");

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
