const mongoose = require("mongoose");

// Mongoose schema defines the structure and types for Announcement documents
const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true }
});

// Mongoose model provides methods to query and manipulate the collection in MongoDB
module.exports = mongoose.model("Announcement", announcementSchema);
