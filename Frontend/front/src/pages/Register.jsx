import { useState } from "react";
import { registerUser } from "../services/authService";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import "../styles/auth.css";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await registerUser(formData);

      if (data.success) {
        alert(data.message);

        setFormData({
          name: "",
          email: "",
          password: "",
        });
      } else {
        alert(data.message);
     
      }
       navigate("/verify-email");
    } catch (error) {
      console.error(error);
      alert("Server Error");
    } finally {
      setLoading(false);
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

        <h1 className="text-2xl font-bold text-white text-center">
          Create your account
        </h1>
        <p className="mt-2 text-sm text-[#9CA3AF] text-center">
          Join CineVerse and start streaming
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {/* Name */}
          <div className="relative group">
            <FiUser
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors duration-300 group-focus-within:text-[#8B5CF6]"
              size={18}
            />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full h-12 pl-11 pr-4 rounded-xl bg-white/5 border border-white/10
                text-white placeholder:text-gray-500 outline-none
                transition-all duration-300
                focus:border-[#8B5CF6]/60 focus:bg-white/10
                focus:shadow-[0_0_0_4px_rgba(139,92,246,0.2)]"
            />
          </div>

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

          {/* Password */}
          <div className="relative group">
            <FiLock
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors duration-300 group-focus-within:text-[#8B5CF6]"
              size={18}
            />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
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
            {loading ? "Loading..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#9CA3AF]">
          <Link
            to="/login"
            className="text-[#8B5CF6] font-medium hover:text-white transition-colors duration-300"
          >
            Already have an account?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;