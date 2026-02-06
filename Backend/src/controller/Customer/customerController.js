const Customer = require("../../model/Customer");

/* =========================
   CREATE CUSTOMER
========================= */
exports.createCustomer = async (req, res) => {
  try {
    const { fullName, phone, email } = req.body;

    // Validation
    if (!fullName || !phone) {
      return res.status(400).json({
        success: false,
        message: "Full name and phone are required",
      });
    }

    // Optional: prevent duplicate phone
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
    const { fullName, phone, email, status } = req.body;

    // Optional enum validation (if you use status)
    const allowedStatuses = ["ACTIVE", "INACTIVE", "BLOCKED"];
    if (status && !allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Allowed: ${allowedStatuses.join(", ")}`,
      });
    }

    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      {
        ...(fullName !== undefined && { fullName }),
        ...(phone !== undefined && { phone }),
        ...(email !== undefined && { email }),
        ...(status !== undefined && { status }),
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
exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    res.json({
      success: true,
      message: "Customer deactivated successfully",
    });
  } catch (error) {
    res.status(500).json({
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
