const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json()); // Only need to call this once

// MongoDB Connection
const uri = process.env.MONGODB;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected!!!!");
});

// Routes
const authRoutes = require("./routes/routes");
const jobRoutes = require("./routes/events");

app.use("/api/auth", authRoutes);
app.use("/api", jobRoutes);

// Static files
app.use(express.static("uploads"));

// Error handling
app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong.";
  res.status(status).json({ message: message });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is starting at ${PORT}`);
});
