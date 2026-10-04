const mongoose = require("mongoose");

// Mongoose schema defines the structure and types for Member documents
const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  club: { type: String, required: true },
  year: { type: Number, required: true }
});

// Mongoose model provides methods to query and manipulate the collection in MongoDB
module.exports = mongoose.model("Member", memberSchema);
