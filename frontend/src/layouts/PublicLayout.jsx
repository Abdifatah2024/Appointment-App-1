import { Outlet, useLocation } from "react-router-dom";
import PublicHeader from "./PublicHeader";

// ✅ Page backgrounds
import bgHome from "../assets/landing/bg-home.png";
import bgServices from "../assets/landing/bg-services.png"; // ✅ ADD THIS
import bgTrack from "../assets/landing/bg-track.png";
import bgAbout from "../assets/landing/bg-about.png";

export default function PublicLayout() {
  const { pathname } = useLocation();

  // ✅ Background map per page
  const bgMap = {
    "/": bgHome,
    "/services": bgServices, // ✅ Services background back
    "/track": bgTrack,
    "/about": bgAbout,
  };

  const currentBg = bgMap[pathname] || bgHome;

  // ✅ Overlay: Home dark; others light
  const overlayClass =
    pathname === "/" ? "bg-black/45 backdrop-blur-[1px]" : "bg-white/30 backdrop-blur-[1px]";

  return (
    <div
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{
        backgroundImage: `url(${currentBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* ✅ Overlay */}
      <div className={`absolute inset-0 pointer-events-none z-0 ${overlayClass}`} />

      {/* ✅ Header */}
      <div className="relative z-10">
        <PublicHeader />
      </div>

      {/* ✅ Content */}
      <main className="relative z-10 flex-1 min-h-0 flex">
        <Outlet />
      </main>

      {/* ✅ Footer */}
      <footer className="relative z-10 border-t border-white/10">
        <div className="bg-gradient-to-r from-slate-950 via-slate-900/95 to-emerald-950/80 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-sm font-semibold text-slate-300">
              © {new Date().getFullYear()} Appointify — Smart Booking System
            </p>

            <div className="flex items-center gap-2">
              {["Privacy", "Terms", "Support"].map((t) => (
                <a
                  key={t}
                  href="#"
                  className="
                    px-3 py-1.5 rounded-xl
                    text-sm font-extrabold text-slate-200
                    bg-white/5 border border-white/10
                    hover:bg-white/10 hover:border-white/20
                    hover:text-emerald-300
                    transition
                  "
                >
                  {t}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
