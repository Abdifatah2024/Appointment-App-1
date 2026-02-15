const mongoose = require("mongoose"); // ✅ REQUIRED
const Customer = require("../../model/Customer");
const Appointment = require("../../model/Appointment");
const Service = require("../../model/Service");

/**
 * ======================================================
 * CREATE PUBLIC APPOINTMENT + OPTIONAL PDF (ONE STEP)
 * ======================================================
 */
exports.createPublicAppointment = async (req, res) => {
  try {
    const {
      fullName,
      phone,
      email,
      gender,
      serviceId,
      appointmentDate,
    } = req.body;

    /* --------------------------------
       1️⃣ BASIC VALIDATION
    -------------------------------- */
    if (!fullName || !phone || !gender || !serviceId || !appointmentDate) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    /* --------------------------------
       2️⃣ VALIDATE SERVICE
    -------------------------------- */
    const service = await Service.findById(serviceId);
    if (!service || !service.isActive) {
      return res.status(404).json({
        success: false,
        message: "Service not available",
      });
    }

    /* --------------------------------
       3️⃣ NORMALIZE DATE
    -------------------------------- */
    const start = new Date(appointmentDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(appointmentDate);
    end.setHours(23, 59, 59, 999);

    /* --------------------------------
       4️⃣ CAPACITY CHECK
    -------------------------------- */
    if (service.maxCustomersPerDay > 0) {
      const booked = await Appointment.countDocuments({
        serviceId,
        appointmentDate: { $gte: start, $lte: end },
        status: { $in: ["PENDING", "APPROVED"] },
      });

      if (booked >= service.maxCustomersPerDay) {
        return res.status(400).json({
          success: false,
          message: "This date is fully booked",
        });
      }
    }

    /* --------------------------------
       5️⃣ FIND OR CREATE CUSTOMER
    -------------------------------- */
    let customer = await Customer.findOne({ phone });

    if (!customer) {
      customer = await Customer.create({
        fullName,
        phone,
        email,
        gender,
      });
    }

    /* --------------------------------
       6️⃣ PREVENT DUPLICATE BOOKING
    -------------------------------- */
    const exists = await Appointment.findOne({
      customerId: customer._id,
      serviceId,
      appointmentDate: { $gte: start, $lte: end },
      status: { $in: ["PENDING", "APPROVED"] },
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "You already booked this service on this date",
      });
    }

    /* --------------------------------
       7️⃣ OPTIONAL DOCUMENT (PDF)
    -------------------------------- */
    const documents = [];

    if (req.file) {
      documents.push({
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        mimeType: req.file.mimetype,
        uploadedAt: new Date(),
      });
    }

    /* --------------------------------
       8️⃣ CREATE APPOINTMENT (ONE SAVE)
    -------------------------------- */
    const appointment = await Appointment.create({
      customerId: customer._id,
      serviceId,
      appointmentDate: start,
      status: "PENDING",
      documents,
    });

    /* --------------------------------
       9️⃣ RESPONSE
    -------------------------------- */
    return res.status(201).json({
      success: true,
      message: "Appointment created successfully",
      data: {
        appointmentId: appointment._id,
        customer: {
          fullName: customer.fullName,
          phone: customer.phone,
        },
        service: {
          id: service._id,
          name: service.name,
        },
        appointmentDate: appointment.appointmentDate,
        status: appointment.status,
        hasDocument: documents.length > 0,
        documents,
      },
    });
  } catch (err) {
    console.error("Create appointment error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to create appointment",
    });
  }
};

/**
 * ======================================================
 * GET APPOINTMENT STATUS (PUBLIC – BY APPOINTMENT ID)
 * ======================================================
 */
exports.getMyAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    /* --------------------------------
       1️⃣ VALIDATE ID FORMAT
    -------------------------------- */
    if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid appointment ID",
      });
    }

    /* --------------------------------
       2️⃣ FIND APPOINTMENT
    -------------------------------- */
    const appointment = await Appointment.findById(appointmentId)
      .populate("serviceId", "name")
      .populate("customerId", "fullName phone");

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    /* --------------------------------
       3️⃣ RESPONSE
    -------------------------------- */
    return res.status(200).json({
      success: true,
      data: {
        appointmentId: appointment._id,
        customer: {
          fullName: appointment.customerId.fullName,
          phone: appointment.customerId.phone,
        },
        service: {
          id: appointment.serviceId._id,
          name: appointment.serviceId.name,
        },
        appointmentDate: appointment.appointmentDate,
        status: appointment.status,
        hasDocument: appointment.documents?.length > 0,
        documentsCount: appointment.documents?.length || 0,
        createdAt: appointment.createdAt,
        updatedAt: appointment.updatedAt,
      },
    });
  } catch (error) {
    console.error("Get appointment status error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch appointment status",
    });
  }
};
