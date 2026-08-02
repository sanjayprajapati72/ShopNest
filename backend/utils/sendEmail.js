
const nodemailer = require("nodemailer");

console.log("EMAIL USER:", process.env.EMAIL_USER);
console.log("EMAIL PASS:", process.env.EMAIL_PASS ? "Loaded" : "Missing");


const sendEmail = async ({ email, subject, message }) => {
  try {

    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 2525,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });


    // Check SMTP connection
    await transporter.verify();
    console.log("✅ SMTP Server Connected");


    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject,
      html: message,
    });


    console.log("✅ Email sent successfully");
    console.log("Message ID:", info.messageId);

    return info;

  } catch (error) {
    console.error("❌ Email Error:", error.message);
    throw error;
  }
};


module.exports = sendEmail;