import { Outlet, useLocation } from "react-router-dom";
import PublicHeader from "./PublicHeader";

// ✅ VIDEOS (MP4)
import bgHomeVideo from "../assets/landing/bg-home.mp4";
import bgServicesVideo from "../assets/landing/bg-services.mp4";
import bgTrackVideo from "../assets/landing/bg-track.mp4";
import bgAboutVideo from "../assets/landing/bg-about.mp4";
import bgMainVideo from "../assets/landing/bg-main.mp4"; // ✅ default / footer pages

export default function PublicLayout() {
  const { pathname } = useLocation();

  // ✅ video map per page
  const videoMap = {
    "/": bgHomeVideo,
    "/services": bgServicesVideo,
    "/track": bgTrackVideo,
    "/about": bgAboutVideo,

    // ✅ Footer pages -> use bg-main.mp4
    "/privacy": bgMainVideo,
    "/terms": bgMainVideo,
    "/support": bgMainVideo,
  };

  const currentVideo = videoMap[pathname] || bgMainVideo;

  // ✅ overlay tuning (darken for readability)
  const overlayClass =
    pathname === "/"
      ? "bg-slate-950/55 backdrop-blur-[1px]"
      : "bg-black/35 backdrop-blur-[1px]";

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      {/* ✅ Video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src={currentVideo}
        autoPlay
        muted
        loop
        playsInline
      />

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
                  href={`/${t.toLowerCase()}`}
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
