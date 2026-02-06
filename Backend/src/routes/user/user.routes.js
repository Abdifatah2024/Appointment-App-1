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
} = require("../../controller/User/user.controller");
const { authMiddleware, isAdmin } = require("../../middlewares/auth.middleware");

router.post("/", createUser);

// Auth
router.post("/login", loginUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

router.delete(
  "/users/permanent/:id",
   authMiddleware,
  isAdmin,
  deleteUserPermanent
);

module.exports = router;
