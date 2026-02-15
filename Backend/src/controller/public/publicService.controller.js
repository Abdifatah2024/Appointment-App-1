const Service = require("../../model/Service");
const Appointment = require("../../model/Appointment");


exports.getActiveServices = async (req, res) => {
  try {
    const services = await Service.find({ isActive: true }).sort({ name: 1 });
    res.json({ success: true, data: services });
  } catch (err) {
    res.status(500).json({ message: "Failed to load services" });
  }
};


exports.getServiceAvailability = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const { date } = req.query; // yyyy-mm-dd

    if (!date) {
      return res.status(400).json({ message: "date is required" });
    }

    const service = await Service.findById(serviceId);
    if (!service || !service.isActive) {
      return res.status(404).json({ message: "Service not found" });
    }

    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const bookedCount = await Appointment.countDocuments({
      serviceId,
      appointmentDate: { $gte: start, $lte: end },
      status: { $in: ["PENDING", "APPROVED"] },
    });

    const max = service.maxCustomersPerDay;

    res.json({
      success: true,
      data: {
        date,
        maxCustomersPerDay: max,
        booked: bookedCount,
        available: max === 0 ? true : bookedCount < max,
        remaining: max === 0 ? null : max - bookedCount,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to check availability" });
  }
};
