import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// ✅ Ensure env variables are loaded
dotenv.config();

/* ================= AUTH MIDDLEWARE ================= */
const jwtAuthMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Header format: "Bearer token"
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authorization token missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // decoded MUST contain { id, role }
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT Error:", err.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

/* ================= TOKEN GENERATOR ================= */
const generateToken = (user) => {
  // user MUST contain id and role
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h", // ✅ use readable format
    }
  );
};

export { jwtAuthMiddleware, generateToken };
