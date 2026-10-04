const express = require("express");
const router = express.Router();
const Announcement = require("../models/Announcement");

// GET /api/announcements - Retrieve all announcements
router.get("/", async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/announcements/:id - Retrieve a single announcement by ID using req.params
router.get("/:id", async (req, res) => {
  try {
    // req.params contains route parameters such as :id
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }
    res.json(announcement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/announcements - Create a new announcement using req.body
router.post("/", async (req, res) => {
  try {
    // req.body contains JSON data sent from the client
    const { title, message } = req.body;
    if (!title || !message) {
      return res.status(400).json({ message: "Please provide title and message" });
    }

    const announcement = await Announcement.create({
      title,
      message
    });
    res.status(201).json(announcement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/announcements/:id - Update an existing announcement using req.params and req.body
router.put("/:id", async (req, res) => {
  try {
    const { title, message } = req.body;
    if (!title || !message) {
      return res.status(400).json({ message: "Please provide title and message" });
    }

    const announcement = await Announcement.findByIdAndUpdate(
      req.params.id,
      { title, message },
      { new: true, runValidators: true }
    );

    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }
    res.json(announcement);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /api/announcements/:id - Delete an announcement by ID using req.params
router.delete("/:id", async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndDelete(req.params.id);
    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }
    res.json({ message: "Announcement deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
