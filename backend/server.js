const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require("./middleware/logger");

const memberRoutes = require("./routes/memberRoutes");
const clubRoutes = require("./routes/clubRoutes");
const meetingRoutes = require("./routes/meetingRoutes");
const announcementRoutes = require("./routes/announcementRoutes");

const app = express();
const PORT = 5000;

// Enable CORS so the React frontend running on another port can communicate with Express
app.use(cors());

// Express middleware parses incoming JSON request bodies into req.body
app.use(express.json());

// Custom logger middleware logs the method and URL of every incoming request
app.use(logger);

// Mount resource routes
app.use("/api/members", memberRoutes);
app.use("/api/clubs", clubRoutes);
app.use("/api/meetings", meetingRoutes);
app.use("/api/announcements", announcementRoutes);

// Basic 404 handler for unknown API routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Hardcoded local MongoDB connection string
const MONGO_URI = "mongodb://127.0.0.1:27017/clubhub";

// Connect to MongoDB using Mongoose
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    console.log("Tip: Ensure local MongoDB service is running on 127.0.0.1:27017, or start it via Docker / Windows Services.");
  });

