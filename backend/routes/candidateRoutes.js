import express from "express";
import Candidate from "../models/candidate.js";
import User from "../models/user.js";
import { jwtAuthMiddleware } from "../jwt.js";

const router = express.Router();

// adminOnly middleware
const adminOnly = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user || user.role !== "admin") {
    return res.status(403).json({ message: "Admin only access" });
  }
  next();
};

// add candidate
router.post("/", jwtAuthMiddleware, adminOnly, async (req, res) => {
  const { name, party, age } = req.body;
  if (!name || !party || !age)
    return res.status(400).json({ error: "All fields are required" });

  const candidate = new Candidate({ name, party, age });
  await candidate.save();
  res.status(201).json(candidate);
});

// delete candidate
router.delete("/:id", jwtAuthMiddleware, adminOnly, async (req, res) => {
  await Candidate.findByIdAndDelete(req.params.id);
  res.json({ message: "Candidate deleted" });
});

// get candidates
router.get("/", async (req, res) => {
  res.json(await Candidate.find());
});

// vote
router.post("/vote/:id", jwtAuthMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (user.role === "admin")
    return res.status(403).json({ error: "Admin cannot vote" });

  if (user.isVoted)
    return res.status(400).json({ error: "You have already voted" });

  const candidate = await Candidate.findById(req.params.id);
  candidate.voteCount++;
  await candidate.save();

  user.isVoted = true;
  await user.save();

  res.json({ message: "Vote recorded successfully" });
});

export default router;
