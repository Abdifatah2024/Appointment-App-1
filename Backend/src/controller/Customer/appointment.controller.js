const Appointment = require("../../model/Appointment");
const Customer = require("../../model/Customer");
const Service = require("../../model/Service");

/* =========================
   CREATE APPOINTMENT
========================= */
exports.createAppointment = async (req, res) => {
  try {
    const {
      customerId,
      serviceId,
      appointmentDate,
      documentsSubmitted,
      identityProvided,
      passportProvided,
      notes,
    } = req.body;

    // Validation
    if (!customerId || !serviceId || !appointmentDate) {
      return res.status(400).json({
        success: false,
        message: "Customer, service, and appointment date are required",
      });
    }

    // Check customer exists
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    // Check service exists
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    const appointment = await Appointment.create({
      customerId,
      serviceId,
      appointmentDate,
      documentsSubmitted,
      identityProvided,
      passportProvided,
      notes,
    });

    res.status(201).json({
      success: true,
      message: "Appointment created successfully",
      data: appointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create appointment",
    });
  }
};

/* =========================
   GET ALL APPOINTMENTS
========================= */
// exports.getAppointments = async (req, res) => {
//   try {
//     const appointments = await Appointment.find()
//       .populate("customerId", "fullName phone")
//       .populate("serviceId", "name code")
//       .sort({ appointmentDate: -1 });

//     res.json({
//       success: true,
//       data: appointments,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message || "Failed to fetch appointments",
//     });
//   }
// };
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ status: "PENDING" })
      .populate("customerId", "fullName phone")
      .populate("serviceId", "name code")
      .sort({ appointmentDate: -1 });

    res.json({
      success: true,
      data: appointments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch appointments",
    });
  }
};

/* =========================
   GET APPOINTMENT BY ID
========================= */
exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate("customerId", "fullName phone")
      .populate("serviceId", "name code");

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch appointment",
    });
  }
};

/* =========================
   UPDATE APPOINTMENT
========================= */
exports.updateAppointment = async (req, res) => {
  try {
    const {
      appointmentDate,
      documentsSubmitted,
      identityProvided,
      passportProvided,
      status,
      notes,
    } = req.body;

    // Status validation
    const allowedStatuses = ["PENDING", "APPROVED", "REJECTED", "COMPLETED"];
    if (status && !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Allowed: ${allowedStatuses.join(", ")}`,
      });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      {
        ...(appointmentDate !== undefined && { appointmentDate }),
        ...(documentsSubmitted !== undefined && { documentsSubmitted }),
        ...(identityProvided !== undefined && { identityProvided }),
        ...(passportProvided !== undefined && { passportProvided }),
        ...(status !== undefined && { status }),
        ...(notes !== undefined && { notes }),
      },
      { new: true, runValidators: true }
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.json({
      success: true,
      message: "Appointment updated successfully",
      data: appointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update appointment",
    });
  }
};

/* =========================
   SOFT DELETE (CANCEL)
========================= */
exports.deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: "REJECTED" },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.json({
      success: true,
      message: "Appointment cancelled successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to cancel appointment",
    });
  }
};

/* =========================
   PERMANENT DELETE
========================= */
exports.deleteAppointmentPermanent = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.json({
      success: true,
      message: "Appointment permanently deleted",
      data: appointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete appointment permanently",
    });
  }
};
