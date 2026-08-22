import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, html) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "CineVerse <onboarding@resend.dev>",
      to,
      subject,
      html,
    });

    if (error) {
      console.log("❌ Email Error:", error);
      throw error;
    }

    console.log("✅ Email Sent Successfully");
  } catch (error) {
    console.log("❌ Email Error:", error);
    throw error;
  }
};

export default sendEmail;