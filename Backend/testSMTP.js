require("dotenv").config();
const nodemailer = require("nodemailer");

async function test() {
  console.log("USER:", process.env.SMTP_USER);
  console.log("PASS:", process.env.SMTP_PASS);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.verify();
    console.log("✅ SMTP Connected Successfully");
  } catch (err) {
    console.log("❌ SMTP Failed");
    console.log(err.message);
  }
}

test();