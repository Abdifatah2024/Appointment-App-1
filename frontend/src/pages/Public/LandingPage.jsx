import { Link } from "react-router-dom";
import { CalendarDays, Search } from "lucide-react";
import hero from "../../assets/landing/hero.png";

export default function LandingPage() {
  return (
    <section className="relative flex-1 w-full overflow-hidden flex items-center">
      {/* ✅ Extra overlay for better harmony with video bg */}
      <div className="absolute inset-0 -z-0 pointer-events-none bg-gradient-to-br from-slate-950/30 via-slate-900/30 to-emerald-950/25" />
      <div className="absolute inset-0 -z-0 pointer-events-none bg-[radial-gradient(circle_at_20%_25%,rgba(59,130,246,0.18),transparent_55%),radial-gradient(circle_at_80%_35%,rgba(16,185,129,0.16),transparent_60%),radial-gradient(circle_at_55%_85%,rgba(56,189,248,0.10),transparent_60%)]" />

      <div className="mx-auto max-w-7xl w-full px-4 md:px-8 py-8 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left */}
          <div className="max-w-xl">
            {/* ✅ Premium glass card with gradient border + glow */}
            <div className="relative rounded-[30px] p-[1.5px] bg-gradient-to-r from-sky-400/70 via-blue-600/60 to-emerald-400/60 shadow-2xl shadow-sky-500/10">
              <div className="relative rounded-[28px] bg-white/8 border border-white/10 backdrop-blur-2xl p-6 md:p-7 overflow-hidden">
                {/* glow */}
                <div className="pointer-events-none absolute -inset-12 opacity-70 blur-2xl
                  bg-[radial-gradient(circle_at_25%_30%,rgba(56,189,248,0.18),transparent_55%),radial-gradient(circle_at_75%_70%,rgba(16,185,129,0.16),transparent_60%)]"
                />
                {/* subtle grid */}
                <div className="pointer-events-none absolute inset-0 opacity-[0.12]
                  bg-[linear-gradient(to_right,rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.18)_1px,transparent_1px)]
                  bg-[size:28px_28px]"
                />

                <h1 className="relative text-4xl md:text-5xl font-black tracking-tight leading-tight text-white">
                  Easy scheduling ahead
                  <span className="block text-slate-100/95">Your Appointment Online</span>
                </h1>

                <p className="relative mt-4 text-slate-200/90 text-base md:text-lg leading-relaxed">
                  Easily and securely book government services online.
                </p>

                {/* Buttons */}
                <div className="relative mt-7 flex flex-col sm:flex-row gap-3">
                  {/* ✅ Primary button: blue→emerald gradient + shine */}
                  <Link
                    to="/book"
                    className="
                      group relative inline-flex items-center justify-center gap-2
                      px-5 py-3 rounded-2xl font-black text-white
                      bg-gradient-to-r from-sky-500 via-blue-600 to-emerald-500
                      shadow-lg shadow-sky-500/15
                      transition-all duration-300
                      hover:-translate-y-[2px] hover:brightness-110
                      focus:outline-none focus:ring-4 focus:ring-sky-400/25
                      overflow-hidden
                    "
                  >
                    {/* shine */}
                    <span
                      className="
                        absolute -inset-10 translate-x-[-60%] opacity-0 group-hover:opacity-100 group-hover:translate-x-[60%]
                        transition-all duration-700
                        bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,0.25)_45%,transparent_60%)]
                      "
                    />
                    <CalendarDays size={18} className="relative" />
                    <span className="relative">Book Appointment</span>
                  </Link>

                  {/* ✅ Secondary button: glass + gradient border + hover glow */}
                  <Link
                    to="/track"
                    className="
                      group relative inline-flex items-center justify-center gap-2
                      px-5 py-3 rounded-2xl font-black text-white
                      bg-white/8 border border-white/15
                      backdrop-blur-2xl
                      shadow-sm shadow-black/10
                      transition-all duration-300
                      hover:-translate-y-[2px] hover:bg-white/12
                      focus:outline-none focus:ring-4 focus:ring-emerald-400/20
                      overflow-hidden
                    "
                  >
                    <span
                      className="
                        absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                        bg-[radial-gradient(circle_at_35%_25%,rgba(56,189,248,0.20),transparent_55%),radial-gradient(circle_at_70%_65%,rgba(16,185,129,0.16),transparent_60%)]
                      "
                    />
                    <Search size={18} className="relative" />
                    <span className="relative">Track Appointment</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="relative flex justify-center lg:justify-end">
            {/* ✅ Gradient frame around hero (calendar) */}
            <div className="group relative">
              {/* outer glow frame */}
              <div
                className="
                  absolute -inset-4 rounded-[34px]
                  bg-gradient-to-r from-sky-400/35 via-blue-600/30 to-emerald-400/30
                  blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-300
                "
              />
              {/* border frame */}
              <div className="relative rounded-[32px] p-[2px] bg-gradient-to-r from-sky-400/70 via-blue-600/60 to-emerald-400/60">
                <div
                  className="
                    rounded-[30px] bg-white/6 border border-white/10 backdrop-blur-2xl
                    p-6 md:p-7
                    transition-transform duration-300
                    group-hover:-translate-y-1 group-hover:scale-[1.01]
                  "
                >
                  <img
                    src={hero}
                    alt="hero"
                    className="w-[420px] sm:w-[520px] md:w-[620px] lg:w-[680px] h-auto object-contain drop-shadow-2xl"
                  />
                </div>
              </div>

              {/* tiny floating dots */}
              <div className="pointer-events-none absolute -top-5 -right-6 w-32 h-32 opacity-60 blur-[1px]
                bg-[radial-gradient(circle,rgba(56,189,248,0.35)_2px,transparent_3px)]
                [background-size:16px_16px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
