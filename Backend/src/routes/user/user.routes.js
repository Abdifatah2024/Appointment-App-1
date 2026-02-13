


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
  updateMyProfile,
  updateMyAvatar, // ✅ NEW
} = require("../../controller/User/user.controller");

const { authMiddleware, isAdmin } = require("../../middlewares/auth.middleware");

// ✅ NEW: upload middleware
const { uploadAvatar } = require("../../middlewares/uploadAvatar");

/* -------------------------
   AUTH + PROFILE
-------------------------- */
router.get("/me", authMiddleware, getMe);
router.post("/login", loginUser);

// ✅ Update name
router.put("/profile", authMiddleware, updateMyProfile);

// ✅ Update avatar (form-data: avatar)
router.put(
  "/profile/avatar",
  authMiddleware,
  uploadAvatar.single("avatar"),
  updateMyAvatar
);

/* -------------------------
   USERS CRUD
-------------------------- */
router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

// Permanent delete (admin only + auth)
router.delete("/users/permanent/:id", authMiddleware, isAdmin, deleteUserPermanent);

module.exports = router;
