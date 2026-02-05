const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },

    // 🔐 MISSING FIELD (FIX)
    password: {
      type: String,
      required: function () {
        return this.provider === "local";
      },
      select: false, // security best practice
    },

    googleId: {
      type: String,
      default: null,
    },

    phone: {
      type: String,
      default: null,
    },

    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "APPROVED",
    },

    role: {
      type: String,
      enum: ["USER","ADMIN", "SUPERADMIN", "CLIENT"],
      default: "user",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
