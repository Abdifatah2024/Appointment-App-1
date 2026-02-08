const Appointment = require("../../model/Appointment");

/* =====================================================
   📊 DASHBOARD SUMMARY FOR APPOINTMENTS
   GET /api/appointments/dashboard
===================================================== */
exports.getAppointmentDashboard = async (req, res) => {
  try {
    /* =========================
       COUNT BY STATUS
    ========================= */
    const [
      total,
      pending,
      approved,
      completed,
      rejected,
      cancelled,
      noShow,
    ] = await Promise.all([
      Appointment.countDocuments(),
      Appointment.countDocuments({ status: "PENDING" }),
      Appointment.countDocuments({ status: "APPROVED" }),
      Appointment.countDocuments({ status: "COMPLETED" }),
      Appointment.countDocuments({ status: "REJECTED" }),
      Appointment.countDocuments({ status: "CANCELLED" }),
      Appointment.countDocuments({ status: "NO_SHOW" }),
    ]);

    /* =========================
       TODAY REQUESTS
    ========================= */
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const todayRequests = await Appointment.countDocuments({
      createdAt: { $gte: startOfToday, $lte: endOfToday },
    });

    /* =========================
       LAST 10 ACTIVITIES
    ========================= */
    const lastActivities = await Appointment.find()
      .sort({ updatedAt: -1 })
      .limit(10)
      .populate("customerId", "fullName phone")
      .populate("serviceId", "name code")
      .populate("assignedUserId", "fullName role email");

    /* =========================
       RESPONSE
    ========================= */
    res.json({
      success: true,
      data: {
        totals: {
          total,
          todayRequests,
        },
        byStatus: {
          pending,
          approved,
          completed,
          rejected,
          cancelled,
          noShow,
        },
        lastActivities,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to load dashboard data",
    });
  }
};