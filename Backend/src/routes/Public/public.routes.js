// const express = require("express");
// const router = express.Router();

// /* ===============================
//    CONTROLLERS
// ================================ */
// const {
//   getActiveServices,
//   getServiceAvailability,
// } = require("../../controller/public/publicService.controller");

// const {
//   createPublicAppointment,
// } = require("../../controller/public/publicAppointment.controller");

// const {
//   uploadAppointmentDocument,
// } = require("../../controller/public/publicDocument.controller");

// /* ===============================
//    MIDDLEWARE
// ================================ */
// const uploadPdf = require("../../middlewares/uploadPdf");

// /* ===============================
//    ROUTES
// ================================ */

// // 🔹 Services (public)
// router.get("/services", getActiveServices);
// router.get("/services/:serviceId/availability", getServiceAvailability);

// // 🔹 Create appointment (public)
// router.post("/appointments", createPublicAppointment);

// // 🔹 Upload PDF documents (public)
// router.post(
//   "/appointments/:appointmentId/documents",
//   uploadPdf.single("file"), // field name = file
//   uploadAppointmentDocument
// );

// module.exports = router;

const express = require("express");
const router = express.Router();

const {
  getActiveServices,
  getServiceAvailability,
} = require("../../controller/public/publicService.controller");

const {
  createPublicAppointment,
  getMyAppointmentStatus,
} = require("../../controller/public/publicAppointment.controller");

const uploadPdf = require("../../middlewares/uploadPdf");

// 🔹 Services
router.get("/services", getActiveServices);
router.get("/services/:serviceId/availability", getServiceAvailability);

// 🔹 ONE-STEP appointment + document upload
router.post(
  "/appointments",
  uploadPdf.single("file"),
  createPublicAppointment
);
router.get(
  "/appointments/:appointmentId/status",
  getMyAppointmentStatus
);


module.exports = router;

