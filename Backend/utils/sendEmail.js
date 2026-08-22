import nodemailer from "nodemailer";

const sendEmail = async (to, subject, html) => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error("EMAIL_USER and EMAIL_PASS must be set in Backend/.env");
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // TLS use hoga, SSL nahi
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      family: 4, // IPv4 force karo, IPv6 ka masla avoid karne ke liye
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