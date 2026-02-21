// // src/utils/sendAppointmentStatusEmail.js

// require("dotenv").config();
// const nodemailer = require("nodemailer");

// const sendAppointmentStatusEmail = async ({
//   email,
//   fullName,
//   status,
//   serviceName,
//   appointmentDate,
//   appointmentId,
// }) => {
//   try {
//     const appName = process.env.APP_NAME || "Appointify System";

//     // ✅ Gmail SMTP Transport
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASS, // Gmail App Password
//       },
//     });

//     // Optional: verify connection before sending
//     await transporter.verify();

//     const statusMessages = {
//       PENDING: "Your appointment is currently under review.",
//       APPROVED: "Your appointment has been approved.",
//       REJECTED: "Unfortunately, your appointment has been rejected.",
//       COMPLETED: "Your appointment has been successfully completed.",
//       NO_SHOW: "You were marked as no-show for your appointment.",
//       ASSIGNED: "Your appointment has been assigned to an officer.",
//     };

//     const formattedDate = appointmentDate
//       ? new Date(appointmentDate).toLocaleString()
//       : null;

//     const html = `
//       <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width:600px;">
        
//         <h2 style="color:#4F46E5;">Appointment Status Update</h2>

//         <p>Hello <strong>${fullName}</strong>,</p>

//         <p>Your appointment for <strong>${serviceName}</strong> has been updated.</p>

//         <p><strong>Status:</strong> ${status}</p>

//         <p>${statusMessages[status] || ""}</p>

//         ${
//           formattedDate
//             ? `<p><strong>Appointment Date:</strong> ${formattedDate}</p>`
//             : ""
//         }

//         <hr style="margin:20px 0;" />

//         <p><strong>Your Appointment ID:</strong></p>

//         <div style="
//           background:#f3f4f6;
//           padding:14px;
//           font-size:18px;
//           font-weight:bold;
//           border-radius:6px;
//           letter-spacing:1px;
//           display:inline-block;
//         ">
//           ${appointmentId}
//         </div>

//         <p style="margin-top:10px; color:#6b7280;">
//           Please copy and keep this ID for tracking your appointment.
//         </p>

//         <br/>

//         <p>Regards,<br>${appName} Team</p>

//       </div>
//     `;

//     await transporter.sendMail({
//       from: `"${appName}" <${process.env.SMTP_USER}>`,
//       to: email,
//       subject: `Appointment Update - ID: ${appointmentId}`,
//       html,
//     });

//     console.log("📨 Appointment status email sent to:", email);

//   } catch (error) {
//     console.error("❌ Error sending appointment status email:", error.message);
//     throw new Error("Failed to send appointment status email");
//   }
// };

// module.exports = { sendAppointmentStatusEmail };
const nodemailer = require("nodemailer");

// ✅ Create transporter ONCE (not every email)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Optional: verify once on startup
transporter.verify((error) => {
  if (error) {
    console.error("❌ SMTP configuration error:", error.message);
  } else {
    console.log("✅ SMTP server is ready to send emails");
  }
});

const sendAppointmentStatusEmail = async ({
  email,
  fullName,
  status,
  serviceName,
  appointmentDate,
  appointmentId,
}) => {
  try {
    if (!email) {
      console.log("⚠️ No email provided, skipping email send.");
      return;
    }

    const appName = process.env.APP_NAME || "Appointment System";

    const statusMessages = {
      PENDING: "Your appointment is currently under review.",
      APPROVED: "Your appointment has been approved.",
      REJECTED: "Unfortunately, your appointment has been rejected.",
      COMPLETED: "Your appointment has been successfully completed.",
      NO_SHOW: "You were marked as no-show for your appointment.",
      ASSIGNED: "Your appointment has been assigned to an officer.",
    };

    const formattedDate = appointmentDate
      ? new Date(appointmentDate).toLocaleString()
      : null;

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width:600px;">
        
        <h2 style="color:#4F46E5;">Appointment Status Update</h2>

        <p>Hello <strong>${fullName}</strong>,</p>

        <p>Your appointment for <strong>${serviceName}</strong> has been updated.</p>

        <p><strong>Status:</strong> ${status}</p>

        <p>${statusMessages[status] || ""}</p>

        ${
          formattedDate
            ? `<p><strong>Appointment Date:</strong> ${formattedDate}</p>`
            : ""
        }

        <hr style="margin:20px 0;" />

        <p><strong>Your Appointment ID:</strong></p>

        <div style="
          background:#f3f4f6;
          padding:14px;
          font-size:18px;
          font-weight:bold;
          border-radius:6px;
          letter-spacing:1px;
          display:inline-block;
        ">
          ${appointmentId}
        </div>

        <p style="margin-top:10px; color:#6b7280;">
          Please copy and keep this ID for tracking your appointment.
        </p>

        <br/>

        <p>Regards,<br>${appName} Team</p>

      </div>
    `;

    await transporter.sendMail({
      from: `"${appName}" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Appointment Update - ID: ${appointmentId}`,
      html,
    });

    console.log("📨 Appointment status email sent to:", email);
  } catch (error) {
    console.error("❌ Error sending appointment status email:", error.message);
  }
};

module.exports = { sendAppointmentStatusEmail };