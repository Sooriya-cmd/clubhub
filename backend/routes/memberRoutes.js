const express = require("express");
const router = express.Router();
const Member = require("../models/Member");

// GET /api/members - Retrieve all members or filter using req.query
router.get("/", async (req, res) => {
  try {
    // req.query contains URL query parameters such as ?club=Robotics&year=2
    const filter = {};
    if (req.query.club) {
      filter.club = req.query.club;
    }
    if (req.query.year) {
      filter.year = Number(req.query.year);
    }

    const members = await Member.find(filter);
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/members/:id - Retrieve a single member by ID using req.params
router.get("/:id", async (req, res) => {
  try {
    // req.params contains route parameters such as :id
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }
    res.json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/members - Create a new member using req.body
router.post("/", async (req, res) => {
  try {
    // req.body contains JSON data sent in the request payload
    const { name, club, year } = req.body;
    if (!name || !club || year === undefined || year === null || year === "") {
      return res.status(400).json({ message: "Please provide name, club, and year" });
    }

    const member = await Member.create({
      name,
      club,
      year: Number(year)
    });
    res.status(201).json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/members/:id - Update an existing member using req.params and req.body
router.put("/:id", async (req, res) => {
  try {
    const { name, club, year } = req.body;
    if (!name || !club || year === undefined || year === null || year === "") {
      return res.status(400).json({ message: "Please provide name, club, and year" });
    }

    const member = await Member.findByIdAndUpdate(
      req.params.id,
      { name, club, year: Number(year) },
      { new: true, runValidators: true }
    );

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }
    res.json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /api/members/:id - Delete a member by ID using req.params
router.delete("/:id", async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }
    res.json({ message: "Member deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
