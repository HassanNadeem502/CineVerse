import { useState } from "react";
import { resetPassword } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import { FiMail, FiKey, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import "../styles/auth.css";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await resetPassword(formData);

    alert(res.message);

    if (res.success) {
      navigate("/login");
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

        <h2 className="text-2xl font-bold text-white text-center">
          Reset Password
        </h2>
        <p className="mt-2 text-sm text-[#9CA3AF] text-center">
          Enter the OTP sent to your email and set a new password
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
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full h-12 pl-11 pr-4 rounded-xl bg-white/5 border border-white/10
                text-white placeholder:text-gray-500 outline-none
                transition-all duration-300
                focus:border-[#8B5CF6]/60 focus:bg-white/10
                focus:shadow-[0_0_0_4px_rgba(139,92,246,0.2)]"
            />
          </div>

          {/* OTP */}
          <div className="relative group">
            <FiKey
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors duration-300 group-focus-within:text-[#8B5CF6]"
              size={18}
            />
            <input
              type="text"
              name="otp"
              placeholder="OTP"
              value={formData.otp}
              onChange={handleChange}
              className="w-full h-12 pl-11 pr-4 rounded-xl bg-white/5 border border-white/10
                text-white placeholder:text-gray-500 outline-none tracking-widest
                transition-all duration-300
                focus:border-[#8B5CF6]/60 focus:bg-white/10
                focus:shadow-[0_0_0_4px_rgba(139,92,246,0.2)]"
            />
          </div>

          {/* New Password */}
          <div className="relative group">
            <FiLock
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors duration-300 group-focus-within:text-[#8B5CF6]"
              size={18}
            />
            <input
              type={showPassword ? "text" : "password"}
              name="newPassword"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full h-12 pl-11 pr-11 rounded-xl bg-white/5 border border-white/10
                text-white placeholder:text-gray-500 outline-none
                transition-all duration-300
                focus:border-[#8B5CF6]/60 focus:bg-white/10
                focus:shadow-[0_0_0_4px_rgba(139,92,246,0.2)]"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white
                transition-colors duration-300 cursor-pointer"
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full h-12 rounded-xl bg-[#7C3AED] text-white font-semibold
              transition-all duration-300
              hover:bg-[#6D28D9] hover:shadow-lg hover:shadow-[#7C3AED]/40
              hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            Reset Password
          </button>
        </form>

        <Link
          to="/login"
          className="mt-6 block text-center text-sm text-[#9CA3AF] hover:text-white transition-colors duration-300"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
}