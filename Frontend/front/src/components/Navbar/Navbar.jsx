import "./Navbar.css";
import { useState, useRef, useEffect } from "react";
import { searchMovies } from "../../services/movieService";
import { NavLink, Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {
  FiSearch,
  FiBell,
  FiMenu,
  FiX,
  FiUser,
  FiSettings,
  FiLogOut,
  FiLogIn,
} from "react-icons/fi";

// Central place for nav links — add/remove routes here only
const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Movies", path: "/movies" },
  { name: "Trending", path: "/trending" },
  { name: "Popular", path: "/popular" },
  { name: "Upcoming", path: "/upcoming" },
  { name: "Top Rated", path: "/top-rated" },
  { name: "Watchlist", path: "/watchlist" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  //search ka liya
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const profileRef = useRef(null);
  const searchRef = useRef(null);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  //search ka liya useEffect
 useEffect(() => {
  const timer = setTimeout(async () => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);

      const movies = await searchMovies(query);

      setResults(movies);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, 300);

  return () => clearTimeout(timer);
}, [query]);

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    navigate("/login");
  };

  return (
    <header
      className="sticky top-0 z-50 w-full h-[72px] bg-[#0B1120]/95 backdrop-blur-md border-b border-white/5"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <nav
        className="h-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4"
        aria-label="Primary navigation"
      >
        {/* ---------------- Left: Logo ---------------- */}
        <Link
          to="/"
          className="flex items-center shrink-0 group"
          aria-label="CineVerse home"
        >
          <span className="text-2xl font-bold tracking-tight transition-transform duration-300 group-hover:scale-105">
            <span className="text-white">Cine</span>
            <span className="text-[#7C3AED]">Verse</span>
          </span>
        </Link>

        {/* ---------------- Center: Nav Links (Desktop) ---------------- */}
        <ul className="hidden lg:flex items-center gap-8 xl:gap-10">
          {NAV_LINKS.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                end={link.path === "/"}
                className="relative group inline-block py-2"
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`text-[14px] font-medium transition-colors duration-300 ${
                        isActive
                          ? "text-[#8B5CF6]"
                          : "text-[#D1D5DB] group-hover:text-white"
                      }`}
                    >
                      {link.name}
                    </span>
                    <span
                      className={`absolute left-0 -bottom-0.5 h-[2px] bg-[#8B5CF6] transition-all duration-300 ease-out ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* ---------------- Right: Search + Icons + Profile ---------------- */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Search bar (hidden on small screens, shown from md up) */}
          <div
            ref={searchRef}
            className="hidden md:block relative w-[160px] lg:w-[220px] xl:w-[260px] transition-all duration-300"
          >
            <label htmlFor="navbar-search" className="sr-only">
              Search movies
            </label>
            <FiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              size={16}
            />
            <input
              id="navbar-search"
              type="text"
              placeholder="Search movies..."
              value={query}
              onFocus={() => setIsSearchFocused(true)}
              onChange={(e) => setQuery(e.target.value)}
              className={`w-full h-10 pl-9 pr-4 rounded-full bg-white/5 border text-sm text-gray-200
                placeholder:text-gray-500 outline-none transition-all duration-300
                ${
                  isSearchFocused
                    ? "border-[#8B5CF6]/60 shadow-[0_0_0_3px_rgba(139,92,246,0.25)] bg-white/10"
                    : "border-white/10 hover:border-white/20"
                }`}
            />
            {query.trim() && (
              <div className="absolute left-0 top-full mt-2 w-full rounded-xl bg-zinc-900 border border-zinc-700 shadow-xl z-50 max-h-96 overflow-y-auto">
                {loading ? (
                  <div className="p-4 text-gray-400">Searching...</div>
                ) : results.length === 0 ? (
                  <div className="p-4 text-gray-400">No movies found.</div>
                ) : (
                  results.map((movie) => (
                    <Link
                      key={movie.id}
                      to={`/movie/${movie.id}`}
                      state={{ movie }}
                      onClick={() => {
                        setQuery("");
                        setResults([]);
                        setIsSearchFocused(false);
                      }}
                      className="flex items-center gap-3 p-3 hover:bg-zinc-800 transition"
                    >
                      {movie.poster_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                          alt={movie.title}
                          className="h-14 w-10 rounded object-cover bg-zinc-800"
                        />
                      ) : (
                        <div className="h-14 w-10 rounded bg-zinc-800" />
                      )}
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-white">
                          {movie.title}
                        </p>
                        <p className="text-xs text-gray-400">
                          {movie.release_date?.slice(0, 4) || "Unknown"}
                        </p>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Search icon (mobile only, no search bar visible) */}
          <button
            type="button"
            aria-label="Search"
            className="md:hidden text-gray-300 hover:text-white transition-all duration-300 hover:scale-110 cursor-pointer"
          >
            <FiSearch size={20} />
          </button>

          {/* Notification bell */}
          <button
            type="button"
            aria-label="Notifications"
            className="relative text-gray-300 hover:text-white transition-all duration-300 hover:scale-110 cursor-pointer"
          >
            <FiBell size={20} />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#8B5CF6]" />
          </button>

          {/* Profile avatar + dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              type="button"
              onClick={() => setIsProfileOpen((prev) => !prev)}
              aria-label="Open profile menu"
              aria-haspopup="true"
              aria-expanded={isProfileOpen}
              className="w-9 h-9 rounded-full border-2 border-[#7C3AED]/60 overflow-hidden
                transition-all duration-300 hover:scale-110 hover:border-[#7C3AED] cursor-pointer shrink-0"
            >
              <img
                src="/assets/avatar-placeholder.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </button>

            {/* Dropdown placeholder */}
            {isProfileOpen && (
              <div
                className="absolute right-0 mt-3 w-48 rounded-xl bg-[#0F172A] border border-white/10
                  shadow-lg shadow-black/40 py-2 animate-[fadeIn_0.2s_ease-out]"
                role="menu"
              >
                {user ? (
                  <Link
                    to="/profile"
                    role="menuitem"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors duration-200"
                  >
                    <FiUser size={16} /> Profile
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/login"
                      role="menuitem"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors duration-200"
                    >
                      <FiLogIn size={16} /> Login
                    </Link>
                    <Link
                      to="/register"
                      role="menuitem"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors duration-200"
                    >
                      <FiUser size={16} /> Register
                    </Link>
                  </>
                )}
                <Link
                  to="/settings"
                  role="menuitem"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors duration-200"
                >
                  <FiSettings size={16} /> Settings
                </Link>
                {user && (
                  <button
                    type="button"
                    role="menuitem"
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors duration-200"
                  >
                    <FiLogOut size={16} /> Logout
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Hamburger (mobile / tablet only) */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            className="lg:hidden text-gray-200 hover:text-white transition-all duration-300 hover:scale-110 cursor-pointer"
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </nav>

      {/* ---------------- Mobile Menu ---------------- */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-[#0B1120] border-b border-white/5
          ${isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <ul className="flex flex-col px-6 py-4 gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                end={link.path === "/"}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block py-3 text-[14px] font-medium border-b border-white/5 transition-colors duration-300 ${
                    isActive
                      ? "text-[#8B5CF6]"
                      : "text-[#D1D5DB] hover:text-white"
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Search bar inside mobile menu */}
        <div className="px-6 pb-4">
          <div className="relative">
            <FiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search movies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-10 pl-9 pr-4 rounded-full bg-white/5 border border-white/10
                text-sm text-gray-200 placeholder:text-gray-500 outline-none
                focus:border-[#8B5CF6]/60 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.25)]
                transition-all duration-300"
            />
            {query.trim() && (
              <div className="absolute left-0 right-0 top-full mt-2 rounded-xl bg-zinc-900 border border-zinc-700 shadow-xl z-50 max-h-80 overflow-y-auto">
                {loading ? (
                  <div className="p-4 text-gray-400">Searching...</div>
                ) : results.length === 0 ? (
                  <div className="p-4 text-gray-400">No movies found.</div>
                ) : (
                  results.map((movie) => (
                    <Link
                      key={movie.id}
                      to={`/movie/${movie.id}`}
                      state={{ movie }}
                      onClick={() => {
                        setQuery("");
                        setResults([]);
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-3 p-3 hover:bg-zinc-800 transition"
                    >
                      {movie.poster_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                          alt={movie.title}
                          className="h-14 w-10 rounded object-cover bg-zinc-800"
                        />
                      ) : (
                        <div className="h-14 w-10 rounded bg-zinc-800" />
                      )}
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-white">
                          {movie.title}
                        </p>
                        <p className="text-xs text-gray-400">
                          {movie.release_date?.slice(0, 4) || "Unknown"}
                        </p>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
