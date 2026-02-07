const Appointment = require("../../model/Appointment");
const Customer = require("../../model/Customer");
const Service = require("../../model/Service");

/* =========================
   CREATE APPOINTMENT
========================= */


/* =========================
   CREATE APPOINTMENT
   WITH DAILY LIMIT HANDLING
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

    /* -------------------------
       BASIC VALIDATION
    ------------------------- */
    if (!customerId || !serviceId || !appointmentDate) {
      return res.status(400).json({
        success: false,
        message: "Customer, service, and appointment date are required",
      });
    }

    /* -------------------------
       CHECK CUSTOMER
    ------------------------- */
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    /* -------------------------
       CHECK SERVICE
    ------------------------- */
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    /* -------------------------
       DATE HANDLING
    ------------------------- */
    let finalDate = new Date(appointmentDate);
    finalDate.setHours(0, 0, 0, 0); // normalize to day

    const maxPerDay = Number(service.maxCustomersPerDay || 0);

    /* -------------------------
       IF LIMITED SERVICE
    ------------------------- */
    if (maxPerDay > 0) {
      let isSlotAvailable = false;

      while (!isSlotAvailable) {
        const startOfDay = new Date(finalDate);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(finalDate);
        endOfDay.setHours(23, 59, 59, 999);

        const count = await Appointment.countDocuments({
          serviceId,
          appointmentDate: {
            $gte: startOfDay,
            $lte: endOfDay,
          },
        });

        if (count < maxPerDay) {
          isSlotAvailable = true;
        } else {
          // 🔁 Move to next day
          finalDate.setDate(finalDate.getDate() + 1);
        }
      }
    }

    /* -------------------------
       CREATE APPOINTMENT
    ------------------------- */
    const appointment = await Appointment.create({
      customerId,
      serviceId,
      appointmentDate: finalDate,
      documentsSubmitted: !!documentsSubmitted,
      identityProvided: !!identityProvided,
      passportProvided: !!passportProvided,
      notes,
    });

    res.status(201).json({
      success: true,
      message: "Appointment created successfully",
      adjustedDate: finalDate, // 👈 IMPORTANT FOR FRONTEND
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
