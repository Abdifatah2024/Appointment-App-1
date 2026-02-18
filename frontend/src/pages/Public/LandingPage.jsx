import { Link } from "react-router-dom";
import { CalendarDays, Search } from "lucide-react";
import hero from "../../assets/landing/hero.png";

export default function LandingPage() {
  return (
    <section className="relative flex-1 w-full overflow-hidden flex items-center">
      <div className="mx-auto max-w-7xl w-full px-4 md:px-8 py-8 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left */}
          <div className="max-w-xl">
            {/* ✅ Glass + border si farta uga dhex muuqato background-ka */}
            <div className="rounded-[28px] bg-white/10 border border-white/15 backdrop-blur-xl shadow-xl shadow-black/20 p-6 md:p-7">
              <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-white">
                Easy scheduling ahead
                <span className="block text-slate-100">Your Appointment Online</span>
              </h1>

              <p className="mt-4 text-slate-200/90 text-base md:text-lg leading-relaxed">
                Easily and securely book government services online.
              </p>

              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                {/* ✅ Book hover/effect like services */}
                <Link
                  to="/book"
                  className="
                    group relative inline-flex items-center justify-center gap-2
                    px-5 py-3 rounded-2xl font-black text-white
                    bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-600
                    shadow-lg shadow-emerald-500/20
                    transition-all duration-300
                    hover:-translate-y-[1px] hover:brightness-110
                    focus:outline-none focus:ring-4 focus:ring-emerald-400/20
                    overflow-hidden
                  "
                >
                  <span
                    className="absolute -inset-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                    bg-[radial-gradient(circle_at_25%_30%,rgba(255,255,255,0.35),transparent_60%)]"
                  />
                  <CalendarDays size={18} className="relative" />
                  <span className="relative">Book Appointment</span>
                </Link>

                {/* ✅ Track hover/effect */}
                <Link
                  to="/track"
                  className="
                    group relative inline-flex items-center justify-center gap-2
                    px-5 py-3 rounded-2xl font-black
                    text-white
                    bg-white/10 border border-white/15
                    backdrop-blur-xl
                    shadow-sm shadow-black/10
                    transition-all duration-300
                    hover:bg-white/15 hover:-translate-y-[1px]
                    focus:outline-none focus:ring-4 focus:ring-sky-400/20
                    overflow-hidden
                  "
                >
                  <span
                    className="absolute -inset-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                    bg-[radial-gradient(circle_at_35%_25%,rgba(56,189,248,0.25),transparent_60%)]"
                  />
                  <Search size={18} className="relative" />
                  <span className="relative">Track Appointment</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="relative flex justify-center lg:justify-end">
            <img
              src={hero}
              alt="hero"
              className="w-[420px] sm:w-[520px] md:w-[620px] lg:w-[680px] h-auto object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
