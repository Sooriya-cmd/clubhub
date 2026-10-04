const mongoose = require("mongoose");

// Mongoose schema defines the structure and types for Meeting documents
const meetingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  venue: { type: String, required: true },
  agenda: { type: String }
});

// Mongoose model provides methods to query and manipulate the collection in MongoDB
module.exports = mongoose.model("Meeting", meetingSchema);
