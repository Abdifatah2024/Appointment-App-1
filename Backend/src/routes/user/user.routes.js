
const express = require("express");
const router = express.Router();

const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
  deleteUserPermanent,
  getMe,
  updateMyProfile, // ✅ NEW
} = require("../../controller/User/user.controller");

const { authMiddleware, isAdmin } = require("../../middlewares/auth.middleware");

// Create user (haddii aad rabto inaad ilaaliso admin only, hoos ka beddel)
router.post("/", createUser);

// ✅ Auth
router.get("/me", authMiddleware, getMe);
router.post("/login", loginUser);

// ✅ NEW: Update my profile (logged-in user)
router.put("/profile", authMiddleware, updateMyProfile);

// users CRUD
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

// Permanent delete (admin only + auth)
router.delete(
  "/users/permanent/:id",
  authMiddleware,
  isAdmin,
  deleteUserPermanent
);

module.exports = router;
