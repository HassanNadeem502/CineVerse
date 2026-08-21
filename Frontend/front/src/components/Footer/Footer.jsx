import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiYoutube,
  FiSend,
  FiFilm,
} from "react-icons/fi";
import "../../styles/Footer.css";

const QUICK_LINKS = [
  { name: "Home", path: "/" },
  { name: "Movies", path: "/movies" },
  { name: "TV Shows", path: "/tv-shows" },
  { name: "Trending", path: "/trending" },
  { name: "Top Rated", path: "/top-rated" },
  { name: "Upcoming", path: "/upcoming" },
];

const GENRES = [
  { name: "Action", path: "/genre/action" },
  { name: "Comedy", path: "/genre/comedy" },
  { name: "Drama", path: "/genre/drama" },
  { name: "Horror", path: "/genre/horror" },
  { name: "Sci-Fi", path: "/genre/sci-fi" },
  { name: "Thriller", path: "/genre/thriller" },
];

const SOCIALS = [
  { icon: FiFacebook, label: "Facebook", href: "#" },
  { icon: FiTwitter, label: "Twitter", href: "#" },
  { icon: FiInstagram, label: "Instagram", href: "#" },
  { icon: FiYoutube, label: "YouTube", href: "#" },
];

// Deterministic-ish scattered particles (no math.random re-runs on each render)
const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  left: (i * 47) % 100,
  size: 2 + (i % 4),
  duration: 8 + (i % 6) * 2,
  delay: (i % 10) * 0.7,
}));

/**
 * TiltCard — wraps children in a lightweight, realistic 3D tilt effect
 * that follows the cursor. Pure CSS transforms, no external library.
 */
const TiltCard = ({ children, className = "" }) => {
  const cardRef = useRef(null);
  const [style, setStyle] = useState({});

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y - rect.height / 2) / rect.height) * -10;
    const rotateY = ((x - rect.width / 2) / rect.width) * 10;

    setStyle({
      transform: `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform:
        "perspective(700px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d", ...style }}
      className={`transition-transform duration-200 ease-out will-change-transform ${className}`}
    >
      {children}
    </div>
  );
};

const Footer = () => {
  return (
    <footer
      className="relative bg-[#05070d] overflow-hidden pt-20 pb-8"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7C3AED] to-transparent" />

      {/* Ambient glow blobs */}
      <div className="absolute -top-32 left-1/4 w-96 h-96 bg-[#7C3AED]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 right-1/4 w-96 h-96 bg-[#8B5CF6]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Animated floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {PARTICLES.map((p) => (
          <span
            key={p.id}
            className="footer-particle"
            style={{
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand + Socials */}
          <div>
            <Link to="/" className="inline-flex items-center gap-2 group">
              <span className="text-2xl font-bold tracking-tight transition-transform duration-300 group-hover:scale-105">
                <span className="text-white">Cine</span>
                <span className="text-[#7C3AED]">Verse</span>
              </span>
            </Link>

            <p className="mt-4 text-sm leading-6 text-[#9CA3AF] max-w-xs">
              Your universe of unlimited movies and shows. Stream anywhere,
              anytime, in stunning quality.
            </p>

            <div className="flex items-center gap-3 mt-6 [perspective:700px]">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <TiltCard key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    className="flex items-center justify-center w-10 h-10 rounded-xl
                      bg-white/5 border border-white/10 text-[#D1D5DB]
                      transition-colors duration-300 hover:text-white hover:border-[#7C3AED]/50
                      hover:bg-[#7C3AED]/10 hover:shadow-lg hover:shadow-[#7C3AED]/20"
                  >
                    <Icon size={17} />
                  </a>
                </TiltCard>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wide uppercase mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="relative inline-block text-sm text-[#9CA3AF] transition-colors duration-300 hover:text-white group"
                  >
                    {link.name}
                    <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-[#8B5CF6] transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Genres */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wide uppercase mb-5">
              Genres
            </h3>
            <ul className="space-y-3">
              {GENRES.map((genre) => (
                <li key={genre.path}>
                  <Link
                    to={genre.path}
                    className="relative inline-block text-sm text-[#9CA3AF] transition-colors duration-300 hover:text-white group"
                  >
                    {genre.name}
                    <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-[#8B5CF6] transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter — 3D tilt card */}
          <div className="[perspective:1000px]">
            <h3 className="text-white font-semibold text-sm tracking-wide uppercase mb-5">
              Stay Updated
            </h3>

            <TiltCard className="rounded-2xl">
              <div
                className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-5
                  shadow-2xl shadow-black/40"
              >
                <div className="flex items-center gap-2 text-[#8B5CF6] mb-3">
                  <FiFilm size={16} />
                  <span className="text-xs font-medium text-[#D1D5DB]">
                    New releases in your inbox
                  </span>
                </div>

                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="flex items-center gap-2"
                >
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full h-11 px-3 rounded-lg bg-white/5 border border-white/10
                      text-sm text-white placeholder:text-gray-500 outline-none
                      transition-all duration-300
                      focus:border-[#8B5CF6]/60 focus:bg-white/10
                      focus:shadow-[0_0_0_3px_rgba(139,92,246,0.2)]"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="flex items-center justify-center w-11 h-11 shrink-0 rounded-lg
                      bg-[#7C3AED] text-white transition-all duration-300
                      hover:bg-[#6D28D9] hover:shadow-lg hover:shadow-[#7C3AED]/40
                      hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <FiSend size={16} />
                  </button>
                </form>
              </div>
            </TiltCard>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-14 pt-6 border-t border-white/5 flex flex-col sm:flex-row
            items-center justify-between gap-4"
        >
          <p className="text-xs text-[#6B7280] text-center sm:text-left">
            © {new Date().getFullYear()} CineVerse. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link
              to="/privacy"
              className="text-xs text-[#6B7280] hover:text-white transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-xs text-[#6B7280] hover:text-white transition-colors duration-300"
            >
              Terms of Service
            </Link>
            <Link
              to="/contact"
              className="text-xs text-[#6B7280] hover:text-white transition-colors duration-300"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
