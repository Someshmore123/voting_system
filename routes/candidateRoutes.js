import express from "express";
import Candidate from "../models/candidate.js";
import User from "../models/user.js";
import { jwtAuthMiddleware } from "../jwt.js";

const router = express.Router();

// ================= ADMIN MIDDLEWARE =================
const adminOnly = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Admin only access" });
    }
    next();
  } catch (err) {
    res.status(500).json({ error: "Admin validation failed" });
  }
};

// ================= ADD CANDIDATE =================
router.post("/", jwtAuthMiddleware, adminOnly, async (req, res) => {
  try {
    const { name, party, age } = req.body;

    if (!name || !party || !age) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const candidate = new Candidate({ name, party, age });
    await candidate.save();

    res.status(201).json(candidate);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ================= DELETE CANDIDATE =================
router.delete("/:id", jwtAuthMiddleware, adminOnly, async (req, res) => {
  try {
    const deleted = await Candidate.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Candidate not found" });
    }
    res.json({ message: "Candidate deleted" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ================= GET CANDIDATES =================
router.get("/", async (req, res) => {
  const candidates = await Candidate.find();
  res.json(candidates);
});

// ================= VOTE COUNT =================

router.post("/vote/:id", jwtAuthMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (user.role === "admin")
    return res.status(403).json({ error: "Admin cannot vote" });

  if (user.isVoted)
    return res.status(400).json({ error: "You have already voted" });

  const candidate = await Candidate.findById(req.params.id);
  if (!candidate)
    return res.status(404).json({ error: "Candidate not found" });

  candidate.voteCount += 1;
  await candidate.save();

  user.isVoted = true;
  await user.save();

  res.json({ message: "Vote recorded successfully" });
});



export default router;
