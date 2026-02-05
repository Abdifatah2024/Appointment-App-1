// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "Unauthorized" });

//   try {
//     req.user = jwt.verify(token, process.env.JWT_SECRET);
//     next();
//   } catch {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };
const jwt = require("jsonwebtoken");

/**
 * 🔐 AUTH MIDDLEWARE
 * - Verifies JWT
 * - Attaches user to req.user
 */
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Expect: Authorization: Bearer TOKEN
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, email, role, ... }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

/**
 * 🛂 ADMIN ONLY MIDDLEWARE
 * - Must be used AFTER authMiddleware
 */
const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }
  next();
};

module.exports = {
  authMiddleware,
  isAdmin,
};

