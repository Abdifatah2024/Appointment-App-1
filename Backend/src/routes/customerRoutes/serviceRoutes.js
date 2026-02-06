const express = require("express");
const router = express.Router();
const {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
} = require("../../controller/Customer/serviceController");


/* ================================
   SERVICE ROUTES
================================ */

// CREATE
router.post("/", createService);

// READ ALL
router.get("/", getServices);

// READ ONE
router.get("/:id", getServiceById);

// UPDATE
router.put("/:id", updateService);

// DELETE
router.delete("/:id", deleteService);

module.exports = router;
