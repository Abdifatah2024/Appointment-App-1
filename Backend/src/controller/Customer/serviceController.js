// const Service = require("../../model/Service");

// /* ================================
//    CREATE SERVICE
// ================================ */
// exports.createService = async (req, res) => {
//   try {
//     const {
//       name,
//       code,
//       description,
//       requiresDocuments,
//       requiresIdentity,
//       requiresPassport,
//       approvalRequired,
//       maxCustomersPerDay,
//       isActive,
//     } = req.body;

//     if (!name || !code) {
//       return res.status(400).json({
//         success: false,
//         message: "Service name and code are required",
//       });
//     }

//     const exists = await Service.findOne({ code });

//     if (exists) {
//       return res.status(409).json({
//         success: false,
//         message: "Service code already exists",
//       });
//     }

//     const service = await Service.create({
//       name,
//       code,
//       description,
//       requiresDocuments,
//       requiresIdentity,
//       requiresPassport,
//       approvalRequired,
//       maxCustomersPerDay,
//       isActive,
//     });

//     res.status(201).json({
//       success: true,
//       data: service,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to create service",
//       error: error.message,
//     });
//   }
// };

// /* ================================
//    GET ALL SERVICES
// ================================ */
// exports.getServices = async (req, res) => {
//   try {
//     const services = await Service.find().sort({ createdAt: -1 });

//     res.json({
//       success: true,
//       data: services,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch services",
//       error: error.message,
//     });
//   }
// };

// /* ================================
//    GET ONE SERVICE
// ================================ */
// exports.getServiceById = async (req, res) => {
//   try {
//     const service = await Service.findById(req.params.id);

//     if (!service) {
//       return res.status(404).json({
//         success: false,
//         message: "Service not found",
//       });
//     }

//     res.json({
//       success: true,
//       data: service,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch service",
//       error: error.message,
//     });
//   }
// };

// /* ================================
//    UPDATE SERVICE
// ================================ */
// exports.updateService = async (req, res) => {
//   try {
//     const service = await Service.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidators: true }
//     );

//     if (!service) {
//       return res.status(404).json({
//         success: false,
//         message: "Service not found",
//       });
//     }

//     res.json({
//       success: true,
//       data: service,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to update service",
//       error: error.message,
//     });
//   }
// };

// /* ================================
//    DELETE SERVICE
// ================================ */
// exports.deleteService = async (req, res) => {
//   try {
//     const service = await Service.findByIdAndDelete(req.params.id);

//     if (!service) {
//       return res.status(404).json({
//         success: false,
//         message: "Service not found",
//       });
//     }

//     res.json({
//       success: true,
//       message: "Service deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to delete service",
//       error: error.message,
//     });
//   }
// };


const Service = require("../../model/Service");

/* ================================
   CREATE SERVICE
================================ */
exports.createService = async (req, res) => {
  try {
    let {
      name,
      code,
      description,
      requiresDocuments,
      requiresIdentity,
      requiresPassport,
      approvalRequired,
      maxCustomersPerDay,
      isActive,
    } = req.body;

    if (!name || !code) {
      return res.status(400).json({
        success: false,
        message: "Service name and code are required",
      });
    }

    // ✅ force uppercase + trim
    code = String(code).toUpperCase().trim();

    const exists = await Service.findOne({ code });
    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Service code already exists",
      });
    }

    const service = await Service.create({
      name,
      code,
      description,
      requiresDocuments,
      requiresIdentity,
      requiresPassport,
      approvalRequired,
      maxCustomersPerDay,
      isActive,
    });

    return res.status(201).json({
      success: true,
      data: service,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create service",
      error: error.message,
    });
  }
};

/* ================================
   GET ALL SERVICES
================================ */
exports.getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });

    return res.json({
      success: true,
      data: services,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch services",
      error: error.message,
    });
  }
};

/* ================================
   GET ONE SERVICE
================================ */
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    return res.json({
      success: true,
      data: service,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch service",
      error: error.message,
    });
  }
};

/* ================================
   UPDATE SERVICE
================================ */
exports.updateService = async (req, res) => {
  try {
    // ✅ if code provided, force uppercase
    if (req.body.code !== undefined) {
      req.body.code = String(req.body.code).toUpperCase().trim();
    }

    // ✅ If code is changing, check duplicate
    if (req.body.code) {
      const exists = await Service.findOne({
        code: req.body.code,
        _id: { $ne: req.params.id },
      });

      if (exists) {
        return res.status(409).json({
          success: false,
          message: "Service code already exists",
        });
      }
    }

    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    return res.json({
      success: true,
      data: service,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update service",
      error: error.message,
    });
  }
};

/* ================================
   DELETE SERVICE
================================ */
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    return res.json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete service",
      error: error.message,
    });
  }
};
