const Appointment = require("../../model/Appointment");

/**
 * UPLOAD DOCUMENT FOR PUBLIC APPOINTMENT
 */
exports.uploadAppointmentDocument = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No document uploaded",
      });
    }

    // 🔍 Check appointment exists
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    // 📎 Save document info
    appointment.documents = appointment.documents || [];
    appointment.documents.push({
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      mimeType: req.file.mimetype,
      uploadedAt: new Date(),
    });

    await appointment.save();

    return res.status(201).json({
      success: true,
      message: "Document uploaded successfully",
      data: {
        appointmentId,
        document: {
          filename: req.file.filename,
          originalName: req.file.originalname,
          size: req.file.size,
        },
      },
    });
  } catch (error) {
    console.error("Upload document error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to upload document",
    });
  }
};
