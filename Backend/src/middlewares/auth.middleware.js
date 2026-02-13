// const jwt = require("jsonwebtoken");

// /**
//  * 🔐 AUTH MIDDLEWARE
//  * - Verifies JWT token
//  * - Attaches decoded user to req.user
//  */
// const authMiddleware = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   // Expect: Authorization: Bearer <TOKEN>
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Normalize role just in case (safety)
//     decoded.role = decoded.role?.toUpperCase();

//     // decoded contains: { id, email, role, iat, exp }
//     req.user = decoded;

//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Invalid or expired token" });
//   }
// };

// /**
//  * 🛂 ADMIN / SUPERADMIN ONLY
//  * - MUST be used AFTER authMiddleware
//  */
// const isAdmin = (req, res, next) => {
//   if (!req.user || !["ADMIN", "SUPERADMIN"].includes(req.user.role)) {
//     return res.status(403).json({ message: "Admin only" });
//   }
//   next();
// };

// module.exports = {
//   authMiddleware,
//   isAdmin,
// };
const jwt = require("jsonwebtoken");

/**
 * 🔐 AUTH MIDDLEWARE
 * - Verifies JWT token
 * - Attaches decoded user to req.user
 */
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Expect: Authorization: Bearer <TOKEN>
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    decoded.role = decoded.role?.toUpperCase();
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

/**
 * 🛂 ADMIN / SUPERADMIN ONLY
 * - MUST be used AFTER authMiddleware
 */
const isAdmin = (req, res, next) => {
  if (!req.user || !["ADMIN", "SUPERADMIN"].includes(req.user.role)) {
    return res.status(403).json({ success: false, message: "Admin only" });
  }
  next();
};

module.exports = {
  authMiddleware,
  isAdmin,
};
