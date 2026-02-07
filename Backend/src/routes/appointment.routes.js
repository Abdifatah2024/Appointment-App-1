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
} = require("../controller/Customer/appointment.controller");

/* ================================
   APPOINTMENT ROUTES
================================ */

// CREATE
router.post("/", createAppointment);

// READ ALL
router.get("/", getAppointments);
router.get("/appointments", getAppointmentsByStatus);

// READ ONE
router.get("/:id", getAppointmentById); 

// UPDATE
router.put("/:id", updateAppointment);

// SOFT DELETE (CANCEL)
router.delete("/:id", deleteAppointment);

// PERMANENT DELETE (OPTIONAL / ADMIN)
router.delete("/permanent/:id", deleteAppointmentPermanent);

module.exports = router;
