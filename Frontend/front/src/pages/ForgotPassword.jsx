import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiArrowLeft } from "react-icons/fi";
import { forgotPassword } from "../services/authService";
import "../styles/auth.css";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await forgotPassword({ email });
      alert(data.message);
      if (data.success) {
        navigate("/reset-password");
      }
    } catch (error) {
      console.log(error);
      alert("Server Error");
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-[#0B1120] px-4 relative overflow-hidden"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Ambient purple glow blobs in the background */}
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

        <h1 className="text-2xl font-bold text-white text-center">
          Forgot Password
        </h1>
        <p className="mt-2 text-sm text-[#9CA3AF] text-center">
          Enter your email to receive a reset link
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#D1D5DB] mb-2"
            >
              Email
            </label>
            <div className="relative group">
              <FiMail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors duration-300 group-focus-within:text-[#8B5CF6]"
                size={18}
              />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full h-12 pl-11 pr-4 rounded-xl bg-white/5 border border-white/10
                  text-white placeholder:text-gray-500 outline-none
                  transition-all duration-300
                  focus:border-[#8B5CF6]/60 focus:bg-white/10
                  focus:shadow-[0_0_0_4px_rgba(139,92,246,0.2)]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-12 rounded-xl bg-[#7C3AED] text-white font-semibold
              transition-all duration-300
              hover:bg-[#6D28D9] hover:shadow-lg hover:shadow-[#7C3AED]/40
              hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            Send Reset Link
          </button>
        </form>

        <Link
          to="/login"
          className="mt-6 flex items-center justify-center gap-2 text-sm text-[#9CA3AF]
            transition-colors duration-300 hover:text-white group"
        >
          <FiArrowLeft
            size={14}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
          Back to Login
        </Link>
      </div>
    </div>
  );
}

export default ForgotPassword;