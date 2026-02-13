


// const express = require("express");
// const router = express.Router();

// const {
//   createUser,
//   getUsers,
//   getUserById,
//   updateUser,
//   deleteUser,
//   loginUser,
//   deleteUserPermanent,
//   getMe,
//   updateMyProfile,
//   updateMyAvatar, // ✅ NEW
// } = require("../../controller/User/user.controller");

// const { authMiddleware, isAdmin } = require("../../middlewares/auth.middleware");

// // ✅ NEW: upload middleware
// const { uploadAvatar } = require("../../middlewares/uploadAvatar");

// /* -------------------------
//    AUTH + PROFILE
// -------------------------- */
// router.get("/me", authMiddleware, getMe);
// router.post("/login", loginUser);

// // ✅ Update name
// router.put("/profile", authMiddleware, updateMyProfile);

// // ✅ Update avatar (form-data: avatar)
// router.put(
//   "/profile/avatar",
//   authMiddleware,
//   uploadAvatar.single("avatar"),
//   updateMyAvatar
// );

// /* -------------------------
//    USERS CRUD
// -------------------------- */
// router.post("/", createUser);
// router.get("/", getUsers);
// router.get("/:id", getUserById);
// router.put("/:id", updateUser);
// router.delete("/:id", deleteUser);

// // Permanent delete (admin only + auth)
// router.delete("/users/permanent/:id", authMiddleware, isAdmin, deleteUserPermanent);

// module.exports = router;
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
  updateMyAvatar,
  updateMyPassword,
} = require("../../controller/User/user.controller");

// ✅ FIX: this matches your real file name: src/middlewares/auth.middleware.js
const { authMiddleware, isAdmin } = require("../../middlewares/auth.middleware");

// ✅ upload middleware (your file name is uploadAvatar.js)
const { uploadAvatar } = require("../../middlewares/uploadAvatar");

/* -------------------------
   AUTH + PROFILE
-------------------------- */
router.get("/me", authMiddleware, getMe);
router.post("/login", loginUser);

// ✅ Update profile (name + bio)
router.put("/profile", authMiddleware, updateMyProfile);

// ✅ Update password
router.put("/password", authMiddleware, updateMyPassword);

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

// ✅ Permanent delete (admin only + auth)
// NOTE: since this router is mounted at /api/users
// final path becomes: /api/users/users/permanent/:id (double users)
router.delete(
  "/users/permanent/:id",
  authMiddleware,
  isAdmin,
  deleteUserPermanent
);

module.exports = router;

