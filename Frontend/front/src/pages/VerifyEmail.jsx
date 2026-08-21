import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiMail, FiShield } from "react-icons/fi";
import { verifyEmail, resendOTP } from "../services/authService";
import "../styles/auth.css";

const VerifyEmail = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    otp: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const data = await verifyEmail(formData);

      if (data.success) {
        alert(data.message);
        navigate("/login");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  //Resend OTP function
  const handleResendOTP = async () => {
    try {
      const data = await resendOTP({ email: formData.email });

      if (data.success) {
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-[#0B1120] px-4 relative overflow-hidden"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Ambient purple glow blobs */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#7C3AED]/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-[#7C3AED]/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Card */}
      <div
        className="relative w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10
          rounded-2xl shadow-2xl shadow-black/50 px-8 py-10 auth-fade-in"
      >
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <span className="text-2xl font-bold tracking-tight">
            <span className="text-white">Cine</span>
            <span className="text-[#7C3AED]">Verse</span>
          </span>
        </div>

        {/* Icon badge */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-[#7C3AED]/15 border border-[#7C3AED]/30 flex items-center justify-center">
            <FiShield className="text-[#8B5CF6]" size={24} />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white text-center">
          Email Verification
        </h2>
        <p className="mt-2 text-sm text-[#9CA3AF] text-center">
          Enter the 6-digit code sent to your email
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {/* Email */}
          <div className="relative group">
            <FiMail
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors duration-300 group-focus-within:text-[#8B5CF6]"
              size={18}
            />
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full h-12 pl-11 pr-4 rounded-xl bg-white/5 border border-white/10
                text-white placeholder:text-gray-500 outline-none
                transition-all duration-300
                focus:border-[#8B5CF6]/60 focus:bg-white/10
                focus:shadow-[0_0_0_4px_rgba(139,92,246,0.2)]"
            />
          </div>

          {/* OTP */}
          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            value={formData.otp}
            onChange={handleChange}
            required
            maxLength={6}
            inputMode="numeric"
            className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10
              text-white text-center text-lg tracking-[0.5em] placeholder:text-gray-500 placeholder:tracking-normal placeholder:text-base
              outline-none transition-all duration-300
              focus:border-[#8B5CF6]/60 focus:bg-white/10
              focus:shadow-[0_0_0_4px_rgba(139,92,246,0.2)]"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl bg-[#7C3AED] text-white font-semibold
              transition-all duration-300 flex items-center justify-center gap-2
              hover:bg-[#6D28D9] hover:shadow-lg hover:shadow-[#7C3AED]/40
              hover:scale-[1.02] active:scale-[0.98] cursor-pointer
              disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading && (
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            )}
            {loading ? "Verifying..." : "Verify Email"}
          </button>

          <button
            type="button"
            onClick={handleResendOTP}
            className="w-full h-12 rounded-xl border border-white/10 bg-white/5 text-[#D1D5DB] font-medium
              transition-all duration-300
              hover:bg-white/10 hover:text-white hover:border-white/20
              hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            Resend OTP
          </button>
        </form>

        <Link
          to="/login"
          className="mt-6 block text-center text-sm text-[#9CA3AF] hover:text-white transition-colors duration-300"
        >
          Back To Login
        </Link>
      </div>
    </div>
  );
};

export default VerifyEmail;
