const mongoose = require("mongoose");

// Mongoose schema defines the structure and types for Club documents
const clubSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String }
});

// Mongoose model provides methods to query and manipulate the collection in MongoDB
module.exports = mongoose.model("Club", clubSchema);
