// const mongoose = require("mongoose");

// const AppointmentSchema = new mongoose.Schema(
//   {
//     customerId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Customer",
//       required: true,
//     },

//     serviceId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Service",
//       required: true,
//     },

//     // 👇 USER (STAFF) ASSIGNED TO THIS APPOINTMENT
//     assignedUserId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//      default: null, // 👈 IMPORTANT
//     },

//     appointmentDate: {
//       type: Date,
//       required: true,
//     },

//     documentsSubmitted: { type: Boolean, default: false },
//     identityProvided: { type: Boolean, default: false },
//     passportProvided: { type: Boolean, default: false },

//     status: {
//       type: String,
//       enum: [
//         "PENDING",
//         "APPROVED",
//         "REJECTED",
//         "COMPLETED",
//         "CANCELLED",
//         "NO_SHOW",
//       ],
//       default: "PENDING",
//     },

//     notes: {
//       type: String,
//       trim: true,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Appointment", AppointmentSchema);


const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },

    assignedUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    appointmentDate: {
      type: Date,
      required: true,
    },

    documentsSubmitted: { type: Boolean, default: false },
    identityProvided: { type: Boolean, default: false },
    passportProvided: { type: Boolean, default: false },

    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED", "COMPLETED", "NO_SHOW"],
      default: "PENDING",
    },

    notes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", AppointmentSchema);
