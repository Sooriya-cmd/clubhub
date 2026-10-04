const express = require("express");
const router = express.Router();
const Club = require("../models/Club");

// GET /api/clubs - Retrieve all clubs
router.get("/", async (req, res) => {
  try {
    const clubs = await Club.find();
    res.json(clubs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/clubs/:id - Retrieve a single club by ID using req.params
router.get("/:id", async (req, res) => {
  try {
    // req.params contains route parameters such as :id
    const club = await Club.findById(req.params.id);
    if (!club) {
      return res.status(404).json({ message: "Club not found" });
    }
    res.json(club);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/clubs - Create a new club using req.body
router.post("/", async (req, res) => {
  try {
    // req.body contains JSON data sent from the client
    const { name, category, description } = req.body;
    if (!name || !category) {
      return res.status(400).json({ message: "Please provide name and category" });
    }

    const club = await Club.create({
      name,
      category,
      description
    });
    res.status(201).json(club);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/clubs/:id - Update an existing club using req.params and req.body
router.put("/:id", async (req, res) => {
  try {
    const { name, category, description } = req.body;
    if (!name || !category) {
      return res.status(400).json({ message: "Please provide name and category" });
    }

    const club = await Club.findByIdAndUpdate(
      req.params.id,
      { name, category, description },
      { new: true, runValidators: true }
    );

    if (!club) {
      return res.status(404).json({ message: "Club not found" });
    }
    res.json(club);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /api/clubs/:id - Delete a club by ID using req.params
router.delete("/:id", async (req, res) => {
  try {
    const club = await Club.findByIdAndDelete(req.params.id);
    if (!club) {
      return res.status(404).json({ message: "Club not found" });
    }
    res.json({ message: "Club deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
