const express = require("express");
const router = express.Router();
const Meeting = require("../models/Meeting");

// GET /api/meetings - Retrieve all meetings
router.get("/", async (req, res) => {
  try {
    const meetings = await Meeting.find();
    res.json(meetings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/meetings/:id - Retrieve a single meeting by ID using req.params
router.get("/:id", async (req, res) => {
  try {
    // req.params contains route parameters such as :id
    const meeting = await Meeting.findById(req.params.id);
    if (!meeting) {
      return res.status(404).json({ message: "Meeting not found" });
    }
    res.json(meeting);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/meetings - Create a new meeting using req.body
router.post("/", async (req, res) => {
  try {
    // req.body contains JSON data sent from the client
    const { title, date, venue, agenda } = req.body;
    if (!title || !date || !venue) {
      return res.status(400).json({ message: "Please provide title, date, and venue" });
    }

    const meeting = await Meeting.create({
      title,
      date,
      venue,
      agenda
    });
    res.status(201).json(meeting);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/meetings/:id - Update an existing meeting using req.params and req.body
router.put("/:id", async (req, res) => {
  try {
    const { title, date, venue, agenda } = req.body;
    if (!title || !date || !venue) {
      return res.status(400).json({ message: "Please provide title, date, and venue" });
    }

    const meeting = await Meeting.findByIdAndUpdate(
      req.params.id,
      { title, date, venue, agenda },
      { new: true, runValidators: true }
    );

    if (!meeting) {
      return res.status(404).json({ message: "Meeting not found" });
    }
    res.json(meeting);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /api/meetings/:id - Delete a meeting by ID using req.params
router.delete("/:id", async (req, res) => {
  try {
    const meeting = await Meeting.findByIdAndDelete(req.params.id);
    if (!meeting) {
      return res.status(404).json({ message: "Meeting not found" });
    }
    res.json({ message: "Meeting deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
