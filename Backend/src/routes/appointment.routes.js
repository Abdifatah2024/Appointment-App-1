const express = require("express");
const router = express.Router();

const {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  deleteAppointmentPermanent,
  getAppointmentsByStatus,
  updateAssignedUser,
  getMyApprovedAppointments,
  getEmployeeDashboardAnalytics,
} = require("../controller/Customer/appointment.controller");
const { getAppointmentDashboard } = require("../controller/Dashboard/appointmentDashboard.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

/* ================================
   APPOINTMENT ROUTES
================================ */

// CREATE
router.post("/", createAppointment);

router.get("/dashboard", getAppointmentDashboard) 
// READ ALL
router.get("/", getAppointments);
router.get("/appointments", getAppointmentsByStatus);


// READ ONE
router.get("/:id", getAppointmentById); 

router.put("/:id/assign-user", updateAssignedUser);
// UPDATE
router.put("/:id", updateAppointment);
router.get(
  "/my/appointments",
  authMiddleware,
  getMyApprovedAppointments
);

router.get(
  "/my/dashboard/analytics",
  authMiddleware,
  getEmployeeDashboardAnalytics
);




// SOFT DELETE (CANCEL)
router.delete("/:id", deleteAppointment);

// PERMANENT DELETE (OPTIONAL / ADMIN)
router.delete("/permanent/:id", deleteAppointmentPermanent);

module.exports = router;
