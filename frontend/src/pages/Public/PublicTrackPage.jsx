import { useMemo, useState } from "react";
import { Search, Lock, Info } from "lucide-react";

export default function PublicTrackPage() {
  const [trackingId, setTrackingId] = useState("");

  const isValid = useMemo(() => trackingId.trim().length >= 6, [trackingId]);
  const isEmpty = trackingId.trim().length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    // TODO: call API / navigate
  };

  return (
    <section className="relative flex-1 w-full overflow-hidden flex items-center justify-center px-4 py-10">
      {/* ✅ Background: more white/clear */}
      <div className="absolute inset-0 pointer-events-none bg-white/35" />
      <div className="absolute inset-0 pointer-events-none bg-black/10" />

      <div className="relative w-full max-w-4xl">
        {/* soft glow */}
        <div className="absolute -inset-10 rounded-[40px] blur-3xl opacity-35 pointer-events-none bg-[radial-gradient(circle_at_50%_40%,rgba(0,0,0,0.16),transparent_60%)]" />

        {/* ✅ OUTER (big red box) -> WHITE */}
        <div className="relative rounded-[34px] p-[2px] bg-white/70 border border-white/60 shadow-2xl shadow-black/10">
          <div className="relative rounded-[32px] bg-white/25 border border-white/35 backdrop-blur-2xl overflow-hidden">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/45" />

            <div className="relative px-6 sm:px-10 py-8 sm:py-10">
              {/* Title */}
              <div className="text-center">
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
                  Track Your Appointment
                </h1>

                <p
                  className="mt-3 inline-flex items-center justify-center rounded-xl px-3.5 py-2
                  text-slate-700 text-sm sm:text-base font-semibold
                  border border-white/55 bg-white/55 backdrop-blur-xl shadow-sm shadow-black/5"
                >
                  Enter your tracking ID to view your appointment status.
                </p>
              </div>

              {/* ✅ INNER (second red box) -> BLACK */}
              <div className="mt-7 sm:mt-8 rounded-3xl p-[2px] bg-black/70 shadow-xl shadow-black/15">
                <div className="rounded-[22px] bg-black/35 backdrop-blur-2xl border border-white/10 px-4 sm:px-5 py-4">
                  <form onSubmit={handleSubmit}>
                    <div className="flex flex-col md:flex-row gap-4 items-stretch">
                      {/* ✅ INPUT (blue light) */}
                      <div className="relative flex-1">
                        <div
                          className="absolute -inset-[3px] rounded-2xl blur-xl opacity-70 pointer-events-none
                          bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.38),transparent_60%)]"
                        />

                        <div className="relative rounded-2xl p-[2px] bg-gradient-to-r from-sky-400/60 via-blue-600/55 to-cyan-400/55">
                          <div className="flex items-center gap-3 rounded-[14px] bg-white/10 border border-white/15 backdrop-blur-2xl px-4 py-3">
                            <Search className="text-white/85" size={18} />
                            <input
                              value={trackingId}
                              onChange={(e) => setTrackingId(e.target.value)}
                              placeholder="APP-2026-001"
                              className="
                                w-full bg-transparent outline-none
                                text-white placeholder:text-white/55
                                font-semibold
                              "
                            />
                          </div>
                        </div>

                        <p className="mt-2 text-xs text-white/70 flex items-center gap-2">
                          <Info size={14} className="opacity-80" />
                          Example:{" "}
                          <span className="font-bold text-white/90">APP-2026-001</span>
                        </p>
                      </div>

                      {/* ✅ BUTTON (green light) -> now smaller like input */}
                      <div className="relative md:w-[240px] w-full">
                        <div className="relative group w-full">
                          <div
                            className="absolute -inset-[3px] rounded-2xl blur-xl opacity-70 pointer-events-none
                            bg-[radial-gradient(circle_at_70%_40%,rgba(16,185,129,0.38),transparent_60%)]"
                          />

                          <button
                            type="submit"
                            disabled={!isValid}
                            className={`
                              relative w-full
                              inline-flex items-center justify-center gap-2
                              px-5 py-3 rounded-2xl font-extrabold text-white
                              transition-all duration-300 overflow-hidden
                              focus:outline-none focus:ring-4 focus:ring-emerald-400/25
                              ${isValid
                                ? "hover:-translate-y-[2px] hover:brightness-110 cursor-pointer"
                                : "opacity-55 cursor-not-allowed"}
                            `}
                          >
                            <span
                              className={`
                                absolute inset-0 rounded-2xl p-[2px]
                                bg-[linear-gradient(90deg,rgba(16,185,129,1),rgba(15,23,42,1),rgba(52,211,153,1),rgba(16,185,129,1))]
                                bg-[length:300%_300%]
                                ${isValid ? "animate-[borderMove_4.2s_linear_infinite]" : ""}
                              `}
                            />
                            <span
                              className={`
                                absolute inset-[2px] rounded-[14px]
                                bg-gradient-to-r from-emerald-500 via-slate-900/90 to-emerald-400
                                shadow-[0_0_22px_rgba(16,185,129,0.25)]
                              `}
                            />
                            <span
                              className={`
                                absolute -inset-10 translate-x-[-60%] opacity-0
                                ${isValid ? "group-hover:opacity-100 group-hover:translate-x-[60%]" : ""}
                                transition-all duration-700
                                bg-[linear-gradient(110deg,transparent_35%,rgba(255,255,255,0.28)_50%,transparent_65%)]
                              `}
                            />
                            <span className="absolute inset-0 rounded-2xl overflow-hidden">
                              <span
                                className={`
                                  absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full
                                  bg-white/25 opacity-0
                                  ${isValid ? "group-active:opacity-100 group-active:animate-[ripple_650ms_ease-out]" : ""}
                                `}
                              />
                            </span>

                            <span className="relative z-10 flex items-center gap-2">
                              Track Status <span className="opacity-90">→</span>
                            </span>
                          </button>

                          {/* ✅ Disabled tooltip */}
                          {!isValid && (
                            <div
                              className="
                                pointer-events-none absolute left-1/2 -top-3 -translate-x-1/2
                                translate-y-[-100%]
                                opacity-0 group-hover:opacity-100 transition
                              "
                            >
                              <div className="rounded-xl bg-slate-950/90 text-white text-xs font-bold px-3 py-2 shadow-lg border border-white/10 flex items-center gap-2">
                                <Lock size={14} className="opacity-80" />
                                {isEmpty ? "Enter a tracking ID first" : "Tracking ID is too short"}
                              </div>
                              <div className="mx-auto w-2 h-2 rotate-45 bg-slate-950/90 border-r border-b border-white/10 -mt-1" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <p className="mt-4 text-center text-xs sm:text-sm text-white/70">
                      Tip: Tracking ID usually looks like{" "}
                      <span className="font-extrabold text-white/90">APP-2026-001</span>
                    </p>
                  </form>

                  <style>{`
                    @keyframes borderMove {
                      0% { background-position: 0% 50%; }
                      50% { background-position: 100% 50%; }
                      100% { background-position: 0% 50%; }
                    }
                    @keyframes ripple {
                      0% { transform: translate(-50%, -50%) scale(1); opacity: 0.35; }
                      100% { transform: translate(-50%, -50%) scale(28); opacity: 0; }
                    }
                  `}</style>
                </div>
              </div>
              {/* end inner */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
