require("dotenv").config();
const app = require("./app");

// import dotenv from "dotenv";
// import app from "./app.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});