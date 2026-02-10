const express = require("express");
const passport = require("passport");
const { googleCallback, completeProfile, approveUser } = require("../../controller/User/auth.controller");
const {
  authMiddleware,
  isAdmin,
} = require("../../middlewares/auth.middleware");
const { getMe } = require("../../controller/User/user.controller");



const router = express.Router();

// 🚀 START GOOGLE LOGIN / REGISTER
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);


router.put("/approve/:id", authMiddleware,isAdmin, approveUser);


// 🔁 CALLBACK
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  googleCallback
);

router.put("/complete-profile/:id", completeProfile);
router.get("/me", authMiddleware, getMe);


module.exports = router;

