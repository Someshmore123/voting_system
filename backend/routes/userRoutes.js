import express from "express";
import User from "../models/user.js";
import { jwtAuthMiddleware, generateToken } from "../jwt.js";

const router = express.Router();



// ================= SIGNUP =================
router.post("/signup", async (req, res) => {
  console.log("Signup request body:", req.body);
  try {
    const { name, aadharCardNumber, password, age, address, role } = req.body;

  if (!name || !aadharCardNumber || !password) {
  return res.status(400).json({ error: "All fields are required" });
}

    // Check 12-digit Aadhar
    if (!/^\d{12}$/.test(aadharCardNumber)) {
      return res.status(400).json({ error: "Aadhar Card Number must be exactly 12 digits" });
    }

    // Check duplicate
    const existingUser = await User.findOne({ aadharCardNumber });
    if (existingUser) return res.status(400).json({ error: "User already exists" });
  
    // 🔒 allow only one admin
if (req.body.role === "admin") {
  const adminExists = await User.findOne({ role: "admin" });
  if (adminExists) {
    return res
      .status(400)
      .json({ error: "Admin already exists, choose voter role" });
  }
}


    // Save user
    const newUser = new User({ name, aadharCardNumber, password, age, address, role });
    const savedUser = await newUser.save();

    // Generate token
    const token = generateToken({ id: savedUser._id, role: savedUser.role });

    res.status(201).json({ user: savedUser, token });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    const { aadharCardNumber, password } = req.body;

    if (!aadharCardNumber || !password) {
      return res
        .status(400)
        .json({ error: "Aadhar Card Number and password are required" });
    }

    const user = await User.findOne({ aadharCardNumber });

    if (!user || !(await user.comparePassword(password))) {
      return res
        .status(401)
        .json({ error: "Invalid Aadhar Card Number or Password" });
    }

   const token = generateToken({
  id: user._id,
  role: user.role,
});


    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ================= PROFILE =================
router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ================= UPDATE PASSWORD =================
// ================= UPDATE PASSWORD =================
// ================= UPDATE PASSWORD =================
router.put("/profile/password", jwtAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: "Both passwords required" });
    }

    const user = await User.findById(userId);

    if (!user || !(await user.comparePassword(currentPassword))) {
      return res.status(401).json({ error: "Current password incorrect" });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Password update error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



export default router;
