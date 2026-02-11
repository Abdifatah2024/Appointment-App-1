const Customer = require("../../model/Customer");
const Appointment = require("../../model/Appointment");


/* =========================
   CREATE CUSTOMER
========================= */
/* =========================
   CREATE CUSTOMER
========================= */
exports.createCustomer = async (req, res) => {
  try {
    const { fullName, phone, email, gender } = req.body;

    /* =========================
       BASIC VALIDATION
    ========================= */
    if (!fullName || !phone || !gender) {
      return res.status(400).json({
        success: false,
        message: "Full name, phone, and gender are required",
      });
    }

    /* =========================
       ENUM VALIDATION
    ========================= */
    const allowedGenders = ["MALE", "FEMALE"];
    if (!allowedGenders.includes(gender)) {
      return res.status(400).json({
        success: false,
        message: `Invalid gender. Allowed: ${allowedGenders.join(", ")}`,
      });
    }

    /* =========================
       DUPLICATE PHONE CHECK
    ========================= */
    const exists = await Customer.findOne({ phone });
    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Customer with this phone already exists",
      });
    }

    /* =========================
       CREATE CUSTOMER
    ========================= */
    const customer = await Customer.create({
      fullName,
      phone,
      email,
      gender,
    });

    res.status(201).json({
      success: true,
      message: "Customer created successfully",
      data: customer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create customer",
    });
  }
};


/* =========================
   GET ALL CUSTOMERS
========================= */
exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: customers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch customers",
    });
  }
};

/* =========================
   GET CUSTOMER BY ID
========================= */
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    res.json({
      success: true,
      data: customer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch customer",
    });
  }
};

/* =========================
   UPDATE CUSTOMER
========================= */
exports.updateCustomer = async (req, res) => {
  try {
    const { fullName, phone, email, status, gender } = req.body;

    /* =========================
       ENUM VALIDATIONS
    ========================= */

    // Status enum (if used)
    const allowedStatuses = ["ACTIVE", "INACTIVE", "BLOCKED"];
    if (status && !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Allowed: ${allowedStatuses.join(", ")}`,
      });
    }

    // Gender enum
    const allowedGenders = ["MALE", "FEMALE"];
    if (gender && !allowedGenders.includes(gender)) {
      return res.status(400).json({
        success: false,
        message: `Invalid gender. Allowed: ${allowedGenders.join(", ")}`,
      });
    }

    /* =========================
       UPDATE CUSTOMER
    ========================= */
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      {
        ...(fullName !== undefined && { fullName }),
        ...(phone !== undefined && { phone }),
        ...(email !== undefined && { email }),
        ...(status !== undefined && { status }),
        ...(gender !== undefined && { gender }),
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    res.json({
      success: true,
      message: "Customer updated successfully",
      data: customer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update customer",
    });
  }
};


/* =========================
   SOFT DELETE CUSTOMER
========================= */
// exports.deleteCustomer = async (req, res) => {
//   try {
//     const customer = await Customer.findByIdAndUpdate(
//       req.params.id,
//       { isActive: false },
//       { new: true }
//     );

//     if (!customer) {
//       return res.status(404).json({
//         success: false,
//         message: "Customer not found",
//       });
//     }

//     res.json({
//       success: true,
//       message: "Customer deactivated successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message || "Failed to deactivate customer",
//     });
//   }
// };



exports.deleteCustomer = async (req, res) => {
  try {
    const customerId = req.params.id;

    // 🔍 Check if customer has any appointments
    const hasAppointments = await Appointment.exists({
      customerId: customerId,
    });

    if (hasAppointments) {
      return res.status(400).json({
        success: false,
        message:
          "Customer cannot be deleted because they have existing appointments",
      });
    }

    // 🗑️ Permanent delete (HARD DELETE)
    const customer = await Customer.findByIdAndDelete(customerId);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Customer deleted permanently",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete customer",
    });
  }
};

/* =========================
   PERMANENT DELETE
========================= */
exports.deleteCustomerPermanent = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    res.json({
      success: true,
      message: "Customer permanently deleted",
      data: customer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete customer permanently",
    });
  }
};

/* =========================
   SEARCH CUSTOMER (NAME / PHONE)
   ?q=ali  OR  ?q=061
========================= */
exports.searchCustomers = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Search query must be at least 2 characters",
      });
    }

    const customers = await Customer.find({
      $and: [
        {
          $or: [
            { fullName: { $regex: q, $options: "i" } },
            { phone: { $regex: q, $options: "i" } },
          ],
        },
        {
          $or: [
            { isActive: true },
            { isActive: { $exists: false } }, // 🔥 KEY FIX
          ],
        },
      ],
    })
      .select("fullName phone email")
      .limit(10)
      .sort({ fullName: 1 });

    res.json({
      success: true,
      count: customers.length,
      data: customers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/* =========================
   SEARCH CUSTOMER
   + APPOINTMENT STATUS
   ?q=name_or_phone
========================= */
exports.searchCustomersWithAppointmentStatus = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Search query must be at least 2 characters",
      });
    }

    /* -------------------------
       FIND CUSTOMERS
    ------------------------- */
    const customers = await Customer.find({
      $and: [
        {
          $or: [
            { fullName: { $regex: q, $options: "i" } },
            { phone: { $regex: q, $options: "i" } },
          ],
        },
        {
          $or: [
            { isActive: true },
            { isActive: { $exists: false } },
          ],
        },
      ],
    })
      .select("fullName phone email")
      .limit(10)
      .sort({ fullName: 1 });

    /* -------------------------
       ATTACH APPOINTMENT STATUS
    ------------------------- */
    const results = await Promise.all(
      customers.map(async (customer) => {
        const appointment = await Appointment.findOne({
          customerId: customer._id,
        })
          .populate("serviceId", "name")
          .sort({ appointmentDate: -1 }); // latest appointment

        return {
          _id: customer._id,
          fullName: customer.fullName,
          phone: customer.phone,
          email: customer.email,
          appointmentStatus: appointment?.status || "NO_APPOINTMENT",
          appointmentDate: appointment?.appointmentDate || null,
          serviceName: appointment?.serviceId?.name || null,
        };
      })
    );

    res.json({
      success: true,
      count: results.length,
      data: results,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to search customers",
    });
  }
};

