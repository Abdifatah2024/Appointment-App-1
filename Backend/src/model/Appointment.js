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

    appointmentDate: {
      type: Date,
      required: true,
    },

    documentsSubmitted: { type: Boolean, default: false },
    identityProvided: { type: Boolean, default: false },
    passportProvided: { type: Boolean, default: false },

    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED", "COMPLETED"],
      default: "PENDING",
    },

    notes: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", AppointmentSchema);
