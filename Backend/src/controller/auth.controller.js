
// // const jwt = require("jsonwebtoken");
// // const User = require("../model/User");

// // exports.googleCallback = async (req, res) => {
// //   try {
// //     const profile = req.user;

// //     if (!profile) {
// //       return res.status(401).json({ message: "Google authentication failed" });
// //     }

// //     // 🔹 Extract Google profile data
// //     const googleId = profile.id;
// //     const email = profile.emails[0].value;
// //     const fullName = profile.displayName;

// //     // 🔍 Check if user already exists
// //     let user = await User.findOne({ email });

// //     // 🆕 If NOT exists → REGISTER
// //     if (!user) {
// //       user = await User.create({
// //         fullName,
// //         email,
// //         googleId,
// //         provider: "google",
// //       });
// //     }

// //     // 🔐 Generate JWT
// //     const token = jwt.sign(
// //       {
// //         id: user._id,
// //         email: user.email,
// //         provider: user.provider,
// //       },
// //       process.env.JWT_SECRET,
// //       { expiresIn: "1h" }
// //     );

// //     // 🔁 Redirect to frontend with token
// //     res.redirect(
// //       `${process.env.FRONTEND_URL}/oauth-success?token=${token}`
// //     );
// //   } catch (error) {
// //     console.error("Google OAuth Error:", error);
// //     res.status(500).json({ message: "Google OAuth failed" });
// //   }
// // };

// const jwt = require("jsonwebtoken");
// const User = require("../model/User");

// exports.googleCallback = async (req, res) => {
//   try {
//     const profile = req.user;

//     const email = profile.emails[0].value;
//     const fullName = profile.displayName;
//     const googleId = profile.id;

//     let user = await User.findOne({ email });

//     // 🆕 Create user if not exists
//     if (!user) {
//       user = await User.create({
//         fullName,
//         email,
//         googleId,
//         provider: "google",
//         status: "PENDING", // 🚨 NOT APPROVED YET
//       });
//     }

//     // ❌ Block login if not approved
//     if (user.status !== "APPROVED") {
//       return res.redirect(
//         `${process.env.FRONTEND_URL}/pending-approval`
//       );
//     }

//     // ❌ Block if phone missing
//     if (!user.phone) {
//       return res.redirect(
//         `${process.env.FRONTEND_URL}/complete-profile?userId=${user._id}`
//       );
//     }

//     // ✅ Now login allowed
//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     );

//     res.redirect(
//       `${process.env.FRONTEND_URL}/oauth-success?token=${token}`
//     );
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Google auth failed" });
//   }
// };

// exports.completeProfile = async (req, res) => {
//   const { phone } = req.body;

//   if (!phone) {
//     return res.status(400).json({ message: "Phone number required" });
//   }

//   const user = await User.findByIdAndUpdate(
//     req.params.id,
//     { phone },
//     { new: true }
//   );

//   res.json({
//     success: true,
//     message: "Profile completed. Wait for approval.",
//     user,
//   });
// };

const jwt = require("jsonwebtoken");
const User = require("../model/User");

/* =====================================================
   GOOGLE CALLBACK
===================================================== */
exports.googleCallback = async (req, res) => {
  try {
    const profile = req.user;

    if (!profile || !profile.emails || !profile.emails.length) {
      return res.status(401).json({
        success: false,
        message: "Google authentication failed",
      });
    }

    const email = profile.emails[0].value;
    const fullName = profile.displayName;
    const googleId = profile.id;

    let user = await User.findOne({ email });

    // 🆕 Create user if not exists
    if (!user) {
      user = await User.create({
        fullName,
        email,
        googleId,
        authProvider: "GOOGLE",
        status: "PENDING", // ⏳ admin must approve
      });
    }

    // ❌ Block if not approved
    if (user.status !== "APPROVED") {
      return res.redirect(
        `${process.env.FRONTEND_URL}/pending-approval`
      );
    }

    // ❌ Block if profile incomplete
    if (!user.phone) {
      return res.redirect(
        `${process.env.FRONTEND_URL}/complete-profile?userId=${user._id}`
      );
    }

    // ✅ Login allowed
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.redirect(
      `${process.env.FRONTEND_URL}/oauth-success?token=${token}`
    );
  } catch (error) {
    console.error("Google OAuth Error:", error);
    res.status(500).json({
      success: false,
      message: "Google authentication failed",
    });
  }
};

/* =====================================================
   COMPLETE PROFILE
===================================================== */
exports.completeProfile = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({
        success: false,
        message: "Phone number is required",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { phone },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      message: "Profile completed. Waiting for admin approval.",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
 


// ✅ ADMIN APPROVES USER
exports.approveUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status: "APPROVED" },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      success: true,
      message: "User approved successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Approval failed" });
  }
};







