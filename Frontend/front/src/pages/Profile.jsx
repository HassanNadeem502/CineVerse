import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiCamera, FiLogIn, FiLogOut, FiUser, FiLock } from "react-icons/fi";
import { uploadProfileImage } from "../services/userService";
import { updateProfile } from "../services/userService";
import { changePassword } from "../services/userService";
import "../styles/auth.css";

function Profile() {
  const navigate = useNavigate();
  const { user, logout, setUser } = useAuth();
  const [image, setImage] = useState(null);

  const [preview, setPreview] = useState("");

  const [profileImage, setProfileImage] = useState("");

  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  //ya input ka liya ha
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
  });
  //
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  //ya useEffect ka liya ha jo user ka data ko form me set kare ga jab user ka data available ho ga
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        bio: user.bio || "",
      });
    }
  }, [user]);
  //profile update karna ka liya
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const data = await updateProfile(formData, token);

      if (data.success) {
        setUser(data.user);
        alert(data.message);
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
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      return alert("All fields are required");
    }

    if (passwordData.newPassword.length < 6) {
      return alert("Password must be at least 6 characters");
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      setPasswordLoading(true);

      const token = localStorage.getItem("token");

      const data = await changePassword(passwordData, token);

      if (data.success) {
        alert(data.message);

        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setPasswordLoading(false);
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);

    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!image) {
      return alert("Please select an image");
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const data = await uploadProfileImage(image, token);

      if (data.success) {
        setProfileImage(data.image); // Image UI me show hogi
        setPreview("");
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      className="min-h-screen w-full bg-[#0B1120] px-4 py-10 sm:px-6 lg:px-10"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="max-w-6xl mx-auto space-y-8">
        {/* ---------------- Top: Welcome + Avatar + Logout ---------------- */}
        <div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6
            bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-6 auth-fade-in"
        >
          <div className="flex items-center gap-5">
            {/* Avatar + upload */}
            <div className="relative group shrink-0">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#7C3AED]/60 bg-white/5">
                {preview || profileImage ? (
                  <img
                    src={preview || profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    <FiUser size={32} />
                  </div>
                )}
              </div>

              <label
                htmlFor="profile-image-input"
                className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#7C3AED] flex items-center
                  justify-center text-white cursor-pointer transition-all duration-300
                  hover:bg-[#6D28D9] hover:scale-110 shadow-lg"
                aria-label="Change photo"
              >
                <FiCamera size={14} />
              </label>
              <input
                id="profile-image-input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            <div>
              <h1 className="text-xl font-bold text-white">
                Welcome {user?.name}
              </h1>
              <p className="text-sm text-[#9CA3AF] mt-1">{user?.email}</p>

              {image && (
                <button
                  onClick={handleUpload}
                  disabled={loading}
                  className="mt-2 text-sm font-medium text-[#8B5CF6] hover:text-white
                    transition-colors duration-300 cursor-pointer disabled:opacity-60"
                >
                  {loading ? "Uploading..." : "Upload New Photo"}
                </button>
              )}
            </div>
          </div>

          {user ? (
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl
                border border-white/10 bg-white/5 text-[#D1D5DB] font-medium
                transition-all duration-300 hover:bg-red-500/10 hover:border-red-500/40 hover:text-red-400
                hover:scale-105 active:scale-95 cursor-pointer"
            >
              <FiLogOut size={16} />
              Logout
            </button>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate("/login")}
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl
                  border border-white/10 bg-white/5 text-[#D1D5DB] font-medium
                  transition-all duration-300 hover:bg-white/10 hover:text-white
                  hover:scale-105 active:scale-95 cursor-pointer"
              >
                <FiLogIn size={16} />
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl
                  bg-[#7C3AED] text-white font-medium transition-all duration-300
                  hover:bg-[#6D28D9] hover:scale-105 active:scale-95 cursor-pointer"
              >
                <FiUser size={16} />
                Register
              </button>
            </div>
          )}
        </div>

        {/* ---------------- Bottom: Profile Info + Change Password ---------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Information */}
          <div
            className="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10
              rounded-2xl px-6 py-7 auth-fade-in"
          >
            <h2 className="text-lg font-bold text-white mb-6">
              Profile Information
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-[#D1D5DB] mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10
                      text-white placeholder:text-gray-500 outline-none transition-all duration-300
                      focus:border-[#8B5CF6]/60 focus:bg-white/10
                      focus:shadow-[0_0_0_4px_rgba(139,92,246,0.2)]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#D1D5DB] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    readOnly
                    className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/5
                      text-gray-400 outline-none cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#D1D5DB] mb-2">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10
                      text-white placeholder:text-gray-500 outline-none transition-all duration-300
                      focus:border-[#8B5CF6]/60 focus:bg-white/10
                      focus:shadow-[0_0_0_4px_rgba(139,92,246,0.2)]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#D1D5DB] mb-2">
                  Bio
                </label>
                <textarea
                  name="bio"
                  rows="4"
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10
                    text-white placeholder:text-gray-500 outline-none transition-all duration-300
                    resize-none focus:border-[#8B5CF6]/60 focus:bg-white/10
                    focus:shadow-[0_0_0_4px_rgba(139,92,246,0.2)]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-6 h-11 rounded-xl bg-[#7C3AED] text-white font-semibold
                  transition-all duration-300
                  hover:bg-[#6D28D9] hover:shadow-lg hover:shadow-[#7C3AED]/40
                  hover:scale-105 active:scale-95 cursor-pointer
                  disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading && (
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                )}
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </div>

          {/* Change Password */}
          <div
            className="bg-white/5 backdrop-blur-xl border border-white/10
              rounded-2xl px-6 py-7 auth-fade-in"
          >
            <h2 className="flex items-center gap-2 text-lg font-bold text-white mb-6">
              <FiLock size={18} className="text-[#8B5CF6]" />
              Change Password
            </h2>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <input
                type="password"
                name="currentPassword"
                placeholder="Current Password"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10
                  text-white placeholder:text-gray-500 outline-none transition-all duration-300
                  focus:border-[#8B5CF6]/60 focus:bg-white/10
                  focus:shadow-[0_0_0_4px_rgba(139,92,246,0.2)]"
              />

              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10
                  text-white placeholder:text-gray-500 outline-none transition-all duration-300
                  focus:border-[#8B5CF6]/60 focus:bg-white/10
                  focus:shadow-[0_0_0_4px_rgba(139,92,246,0.2)]"
              />

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm New Password"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10
                  text-white placeholder:text-gray-500 outline-none transition-all duration-300
                  focus:border-[#8B5CF6]/60 focus:bg-white/10
                  focus:shadow-[0_0_0_4px_rgba(139,92,246,0.2)]"
              />

              <button
                type="submit"
                disabled={passwordLoading}
                className="w-full flex items-center justify-center gap-2 h-11 rounded-xl bg-[#7C3AED] text-white font-semibold
                  transition-all duration-300
                  hover:bg-[#6D28D9] hover:shadow-lg hover:shadow-[#7C3AED]/40
                  hover:scale-[1.02] active:scale-[0.98] cursor-pointer
                  disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {passwordLoading && (
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                )}
                {passwordLoading ? "Updating..." : "Update Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
