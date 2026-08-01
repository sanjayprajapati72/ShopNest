// //  const nodemailer = require('nodemailer');

// //  const sendEmail =  async (to ,subject , text ) =>{
// //     try{
// //         const transporter = nodemailer.createTransport({
// //             service: 'Gmail',
// //             auth : {
// //                 user:process.env.EMAIL_USER,
// //                 pass:process.env.EMAIL_PASS

// //             }

// //         });
// //         const mailOptions = {
// //             from: process.env.EMAIL_USER,
// //             to,
// //             subject,
// //             text
// //         };
// //         await transporter.sendMail(mailOptions) ;
// //     }
// //     catch(error){
// //         console.error('Error sending email:',error)
// //     }
// //  };
// //  module.exports = sendEmail;



// const nodemailer = require("nodemailer");

// const sendEmail = async (to, subject, message) => {
//     try {
//         const transporter = nodemailer.createTransport({
//             service: "gmail",
//             auth: {
//                 user: process.env.EMAIL_USER,
//                 pass: process.env.EMAIL_PASS,
//             },
//         });

//         await transporter.sendMail({
//             // from: `"ShopNest" <${process.env.EMAIL}>`,
//             from: `"ShopNest" <${process.env.EMAIL_USER}>`,
//             to,
//             subject,
//             html: message, // HTML email
//         });

//         console.log("✅ Email sent successfully");
//     } catch (error) {
//         console.error("❌ Email Error:", error.message);
//         throw error;
//     }
// };

// module.exports = sendEmail;



const nodemailer = require("nodemailer");

const sendEmail = async ({ email, subject, message }) => {
  try {
    console.log("========== EMAIL DEBUG ==========");
    console.log("To:", email);
    console.log("EMAIL_USER:", process.env.EMAIL_USER);

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      family: 4, // Force IPv4
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.verify();
    console.log("✅ SMTP Connected");

    const info = await transporter.sendMail({
      from: `"ShopNest" <${process.env.EMAIL_USER}>`,
      to: email,
      subject,
      html: message,
    });

    console.log("✅ Email Sent");
    console.log(info.messageId);

    return info;
  } catch (error) {
    console.error("EMAIL ERROR:", error);
    throw error;
  }
};

module.exports = sendEmail;