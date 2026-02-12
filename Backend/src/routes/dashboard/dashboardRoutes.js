// const express = require("express");
// const router = express.Router();

// const {
//   getCounts,
//   getLatestUpdates,
// } = require("../../controller/Dashboard/appointmentDashboard.controller");

// // ✅ Counts for badges (pending/approved/completed + optional customers/services)
// router.get("/counts", getCounts);

// // ✅ Latest updates list for bell dropdown
// router.get("/updates", getLatestUpdates);

// module.exports = router;


const express = require("express");
const router = express.Router();

const {
  getCounts,
  getLatestUpdates,
} = require("../../controller/Dashboard/appointmentDashboard.controller");

// Counts for badges
router.get("/counts", getCounts);

// Latest updates list
router.get("/updates", getLatestUpdates);

module.exports = router;
