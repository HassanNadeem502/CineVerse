import nodemailer from "nodemailer";

const sendEmail = async (to, subject, html) => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error("EMAIL_USER and EMAIL_PASS must be set in Backend/.env");
    }

    // dotenv.config() has already run by the time this function is called.
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    });
    console.log("✅ Email Sent Successfully");
  } catch (error) {
    console.log("❌ Email Error:", error);
    throw error;
  }
};

export default sendEmail;
