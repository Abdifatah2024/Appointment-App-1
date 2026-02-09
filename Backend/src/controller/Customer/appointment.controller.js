const Appointment = require("../../model/Appointment");
const Customer = require("../../model/Customer");
const Service = require("../../model/Service");

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

    if (!customerId || !serviceId || !appointmentDate) {
      return res.status(400).json({
        success: false,
        message: "Customer, service, and appointment date are required",
      });
    }

    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    let finalDate = new Date(appointmentDate);
    finalDate.setHours(0, 0, 0, 0);

    const maxPerDay = Number(service.maxCustomersPerDay || 0);

    if (maxPerDay > 0) {
      let available = false;

      while (!available) {
        const start = new Date(finalDate);
        start.setHours(0, 0, 0, 0);

        const end = new Date(finalDate);
        end.setHours(23, 59, 59, 999);

        const count = await Appointment.countDocuments({
          serviceId,
          appointmentDate: { $gte: start, $lte: end },
        });

        if (count < maxPerDay) {
          available = true;
        } else {
          finalDate.setDate(finalDate.getDate() + 1);
        }
      }
    }

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
      adjustedDate: finalDate,
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
   GET PENDING APPOINTMENTS
========================= */
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ status: "PENDING" })
      .populate("customerId", "fullName phone")
      .populate("serviceId", "name code")
      .sort({ appointmentDate: -1 });

    res.json({ success: true, data: appointments });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch appointments",
    });
  }
};

exports.getAppointmentsByStatus = async (req, res) => {
  try {
    const { status } = req.query;

    const allowedStatuses = ["PENDING", "APPROVED", "COMPLETED", "REJECTED"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Allowed: ${allowedStatuses.join(", ")}`,
      });
    }

    const appointments = await Appointment.find({ status })
      .populate("customerId", "fullName phone")
      .populate("serviceId", "name code")
      // ✅ POPULATE ASSIGNED USER
      .populate("assignedUserId", "fullName email role")
      .sort({ appointmentDate: -1 });

    res.json({
      success: true,
      count: appointments.length,
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

    res.json({ success: true, data: appointment });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch appointment",
    });
  }
};

/* =====================================================
   ✅ UPDATE ONLY ASSIGNED USER (NEW FUNCTION)
===================================================== */
exports.updateAssignedUser = async (req, res) => {
  try {
    const { assignedUserId, notes } = req.body;

    if (!assignedUserId) {
      return res.status(400).json({
        success: false,
        message: "assignedUserId is required",
      });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      {
        assignedUserId,
        ...(notes !== undefined && { notes }),
      },
      { new: true, runValidators: true }
    )
      .populate("customerId", "fullName phone")
      .populate("serviceId", "name code")
      .populate("assignedUserId", "fullName role email");

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.json({
      success: true,
      message: "User assigned successfully",
      data: appointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to assign user",
    });
  }
};

/* =========================
   UPDATE GENERAL FIELDS
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



/* =====================================================
   GET MY ASSIGNED APPROVED APPOINTMENTS
===================================================== */
exports.getMyApprovedAppointments = async (req, res) => {
  try {
    const userId = req.user.id; // from auth middleware

    const appointments = await Appointment.find({
      assignedUserId: userId,
      status: "APPROVED",
    })
      .populate("customerId") // FULL customer info
      .populate("serviceId")  // FULL service info
      .sort({ appointmentDate: 1 });

    res.json({
      success: true,
      count: appointments.length,
      data: appointments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch assigned appointments",
    });
  }
};


/* =====================================================
   EMPLOYEE DASHBOARD ANALYTICS
   ?month=2&year=2026
===================================================== */
exports.getEmployeeDashboardAnalytics = async (req, res) => {
  try {
    const userId = req.user.id;
    const { month, year } = req.query;

    if (!month || !year) {
      return res.status(400).json({
        success: false,
        message: "month and year are required",
      });
    }

    const m = Number(month);
    const y = Number(year);

    const startOfMonth = new Date(y, m - 1, 1, 0, 0, 0);
    const endOfMonth = new Date(y, m, 0, 23, 59, 59);

    const now = new Date();

    /* =========================
       FETCH ALL ASSIGNED (MONTH)
    ========================= */
    const appointments = await Appointment.find({
      assignedUserId: userId,
      appointmentDate: {
        $gte: startOfMonth,
        $lte: endOfMonth,
      },
    })
      .populate("customerId", "gender")
      .populate("serviceId", "name");

    /* =========================
       COUNTERS
    ========================= */
    let totalAssigned = appointments.length;
    let completed = 0;
    let approvedPending = 0;
    let noShow = 0;

    const byGender = { MALE: 0, FEMALE: 0 };
    const byService = {};

    appointments.forEach((a) => {
      // STATUS LOGIC
      if (a.status === "COMPLETED") completed++;

      if (a.status === "APPROVED") {
        if (a.appointmentDate < now) noShow++;
        else approvedPending++;
      }

      // GENDER
      const gender = a.customerId?.gender;
      if (gender) byGender[gender] = (byGender[gender] || 0) + 1;

      // SERVICE
      const serviceName = a.serviceId?.name;
      if (serviceName) {
        byService[serviceName] =
          (byService[serviceName] || 0) + 1;
      }
    });

    res.json({
      success: true,
      filters: { month: m, year: y },
      data: {
        summary: {
          totalAssigned,
          completed,
          approvedPending,
          noShow,
        },
        byGender,
        byService,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error.message || "Failed to load dashboard analytics",
    });
  }
};
