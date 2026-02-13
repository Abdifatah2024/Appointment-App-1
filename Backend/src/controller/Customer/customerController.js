
const Customer = require("../../model/Customer");
const Appointment = require("../../model/Appointment");

/* =========================
   CREATE CUSTOMER
========================= */
exports.createCustomer = async (req, res) => {
  try {
    const { fullName, phone, email, gender } = req.body;

    if (!fullName || !phone || !gender) {
      return res.status(400).json({
        success: false,
        message: "Full name, phone, and gender are required",
      });
    }

    const allowedGenders = ["MALE", "FEMALE"];
    if (!allowedGenders.includes(gender)) {
      return res.status(400).json({
        success: false,
        message: `Invalid gender. Allowed: ${allowedGenders.join(", ")}`,
      });
    }

    const exists = await Customer.findOne({ phone });
    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Customer with this phone already exists",
      });
    }

    const customer = await Customer.create({
      fullName,
      phone,
      email,
      gender,
      // isActive default true (model)
    });

    return res.status(201).json({
      success: true,
      message: "Customer created successfully",
      data: customer,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create customer",
    });
  }
};

/* =========================
   GET ALL CUSTOMERS (ACTIVE ONLY) ✅ FIX
========================= */
exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({
      isActive: { $ne: false }, // ✅ true OR missing, but not false
    }).sort({ createdAt: -1 });

    return res.json({
      success: true,
      data: customers,
    });
  } catch (error) {
    return res.status(500).json({
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

    return res.json({
      success: true,
      data: customer,
    });
  } catch (error) {
    return res.status(500).json({
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

    const allowedStatuses = ["ACTIVE", "INACTIVE", "BLOCKED"];
    if (status && !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Allowed: ${allowedStatuses.join(", ")}`,
      });
    }

    const allowedGenders = ["MALE", "FEMALE"];
    if (gender && !allowedGenders.includes(gender)) {
      return res.status(400).json({
        success: false,
        message: `Invalid gender. Allowed: ${allowedGenders.join(", ")}`,
      });
    }

    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      {
        ...(fullName !== undefined && { fullName }),
        ...(phone !== undefined && { phone }),
        ...(email !== undefined && { email }),
        ...(status !== undefined && { status }),
        ...(gender !== undefined && { gender }),
      },
      { new: true, runValidators: true }
    );

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    return res.json({
      success: true,
      message: "Customer updated successfully",
      data: customer,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update customer",
    });
  }
};

/* =========================
   SOFT DELETE CUSTOMER ✅ FIX
========================= */
exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      { isActive: false }, // ✅ now this will be saved because model has isActive
      { new: true }
    );

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    return res.json({
      success: true,
      message: "Customer deactivated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to deactivate customer",
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

    return res.json({
      success: true,
      message: "Customer permanently deleted",
      data: customer,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to delete customer permanently",
    });
  }
};

/* =========================
   SEARCH CUSTOMER (NAME / PHONE) ✅ active only
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
        { isActive: { $ne: false } }, // ✅
      ],
    })
      .select("fullName phone email")
      .limit(10)
      .sort({ fullName: 1 });

    return res.json({
      success: true,
      count: customers.length,
      data: customers,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================
   SEARCH CUSTOMER + APPOINTMENT STATUS ✅ active only
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

    const customers = await Customer.find({
      $and: [
        {
          $or: [
            { fullName: { $regex: q, $options: "i" } },
            { phone: { $regex: q, $options: "i" } },
          ],
        },
        { isActive: { $ne: false } }, // ✅
      ],
    })
      .select("fullName phone email")
      .limit(10)
      .sort({ fullName: 1 });

    const results = await Promise.all(
      customers.map(async (customer) => {
        const appointment = await Appointment.findOne({
          customerId: customer._id,
        })
          .populate("serviceId", "name")
          .sort({ appointmentDate: -1 });

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

    return res.json({
      success: true,
      count: results.length,
      data: results,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to search customers",
    });
  }
};
