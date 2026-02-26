// import { Link } from "react-router-dom";
// import { Search, FileText, ArrowRight } from "lucide-react";

// export default function LandingPage() {
//   return (
//     <section className="relative min-h-[calc(100vh-80px-56px)] flex items-center justify-center px-6 bg-slate-950 overflow-hidden">
//       {/* Soft Background */}
//       <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pointer-events-none" />
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(37,99,235,.28),transparent_55%)] pointer-events-none" />
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(59,130,246,.18),transparent_60%)] pointer-events-none" />

//       {/* Center Card */}
//       <div className="relative z-10 w-full max-w-3xl">
//         <div className="rounded-[28px] p-[1px] bg-gradient-to-br from-blue-600/35 to-white/10 shadow-[0_30px_70px_rgba(0,0,0,.45)]">
//           <div className="rounded-[27px] bg-white/5 border border-white/10 backdrop-blur-2xl p-8 md:p-12 text-center">
//             {/* Small badge */}
//             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/15 border border-blue-400/25 text-blue-100 font-bold text-sm mb-6">
//               <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
//               Appointment System
//             </div>

//             {/* TITLE */}
//             <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
//               KA QABSO BALANTAADA HALKAN 
//             </h1>

//             {/* SUBTITLE */}
//             <p className="mt-5 text-slate-300 text-lg md:text-xl font-medium leading-relaxed">
//               Si fudud u qabso ballantaada, lana soco dhaqdhaqaaqa codsigaaga.
//             </p>

//             {/* BUTTONS */}
//             <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
//               <Link
//                 to="/services"
//                 className="
//                   group inline-flex items-center justify-center gap-2
//                   px-7 py-4 rounded-2xl
//                   bg-gradient-to-r from-blue-600 to-blue-700
//                   text-white font-extrabold text-lg
//                   shadow-lg shadow-blue-600/20
//                   transition-all duration-300
//                   hover:-translate-y-1 hover:brightness-110
//                   focus:outline-none focus:ring-2 focus:ring-blue-400/60
//                 "
//               >
//                 <FileText size={20} />
//                 Services
//                 <ArrowRight
//                   size={18}
//                   className="transition-transform duration-300 group-hover:translate-x-1"
//                 />
//               </Link>

//               <Link
//                 to="/track"
//                 className="
//                   group inline-flex items-center justify-center gap-2
//                   px-7 py-4 rounded-2xl
//                   border border-white/20 bg-white/5
//                   text-white font-extrabold text-lg
//                   transition-all duration-300
//                   hover:-translate-y-1 hover:bg-white/10
//                   focus:outline-none focus:ring-2 focus:ring-white/30
//                 "
//               >
//                 <Search size={20} />
//                 Track
//                 <ArrowRight
//                   size={18}
//                   className="transition-transform duration-300 group-hover:translate-x-1"
//                 />
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* Small footer hint (optional, simple) */}
//         <p className="mt-6 text-center text-slate-400 font-semibold text-sm">
//           Door “Services” si aad u bilowdo, ama “Track” si aad u hubiso status-ka.
//         </p>
//       </div>
//     </section>
//   );
// }

import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

import girlImg from "../../assets/landing/landing-page.png";
import bgVideo from "../../assets/landing/bg-home.mp4";

export default function LandingPage() {
  const location = useLocation();

  // ✅ HOME ONLY: scroll xiro (marka aad ka baxdana dib u fur)
  useEffect(() => {
    if (location.pathname === "/") document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "");
  }, [location.pathname]);

  return (
    <section className="relative w-full h-full overflow-hidden">
      {/* ================= BACKGROUND VIDEO ================= */}
      <video
        className="
          absolute inset-0 w-full h-full object-cover -z-30
          scale-[1.05]              /* ✅ VIDEO ZOOM */
          object-center
        "
        src={bgVideo}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* ================= OVERLAY ================= */}
      <div className="absolute inset-0 bg-black/35 -z-20" />

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 w-full h-full px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 h-full items-end">
          {/* ================= LEFT TEXT ================= */}
          <div className="space-y-7 lg:pb-16">
            {/* ✅ HEADLINE */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05]">
              {/* Easy <br />
              scheduling <br />
              ahead */}
            </h1>

            {/* ✅ PARAGRAPH */}
            {/* <p className="text-white/75 text-base sm:text-lg max-w-xl leading-relaxed">
              Book appointments faster, stay organized,
              <br />
              and track requests with a clean and
              <br />
              simple experience.
            </p> */}

            {/* ✅ BUTTON (z-index sare + clickable) */}
            <div className="pt-1 relative z-20">
              <Link
                to="/services"
                className="
                  relative inline-flex items-center justify-center rounded-full
                  px-12 py-4
                  text-xl font-extrabold text-white
                  bg-[#2563EB]/30 border border-[#3B82F6]/45 backdrop-blur-md
                  shadow-xl shadow-[#2563EB]/30
                  hover:scale-[1.03] transition
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]
                "
              >
                <span className="absolute -inset-[3px] rounded-full glow-ring" />
                Book Now!
              </Link>
            </div>
          </div>

          {/* ================= RIGHT SIDE (GIRL) ================= */}
          <div className="relative h-full flex justify-center lg:justify-end items-end">
            {/* ✅ GLOW CIRCLE */}
            <div
              className="
                absolute -z-10 right-0 bottom-28
                h-[560px] w-[560px]
                rounded-full blur-3xl opacity-70
                animate-pulse-soft
              "
              style={{
                background:
                  "radial-gradient(circle at 40% 35%, rgba(59,130,246,0.55), transparent 65%)",
              }}
            />

            {/* =========================================================
               ✅ GIRL IMAGE
               1) pointer-events-none -> si uusan u qaban click-ka button-ka
               2) TRANSLATE X (bidix/midig):
                    - translateX(-) => bidix
                    - translateX(+) => midig
                  Halkan waxaan ku siiyay inline style si aad si fudud u maamusho.
            ========================================================== */}
            <img
              src={girlImg}
              alt="Hero"
              draggable="false"
              className="
                relative object-contain max-w-none
                pointer-events-none      /* ✅ IMPORTANT: BUTTON ha shaqeeyo */
                drop-shadow-[0_30px_70px_rgba(0,0,0,0.65)]
              "
              style={{
                width: "1300px",         // ✅ GIRL SIZE
                marginBottom: "-40px",   // ✅ hoos u sii dhig (footer taabasho)
                transform: "translateX(100px)", // ✅ MIDIG U DURKI: 20/40/60px (bidix = -20px)
              }}
            />

            {/* ✅ GROUND SHADOW (la jaanqaad width-ka gabadha haddii loo baahdo) */}
            <div
              className="
                absolute bottom-0 left-1/2 -translate-x-1/2
                w-[1000px] h-24
                bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.55),transparent_72%)]
                blur-2xl opacity-70
              "
            />
          </div>
        </div>
      </div>

      {/* ================= Animations ================= */}
      <style>{`
        .glow-ring {
          pointer-events: none;
          border: 2px solid rgba(59,130,246,0.35);
          animation: ringPulse 1.7s ease-in-out infinite;
        }
        @keyframes ringPulse {
          0%,100% { opacity: 0.35; box-shadow: 0 0 0 rgba(59,130,246,0); }
          50% { opacity: 1; box-shadow: 0 0 30px rgba(59,130,246,0.6); }
        }

        @keyframes pulseSoft {
          0%,100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.04); }
        }
        .animate-pulse-soft { animation: pulseSoft 3.2s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .glow-ring, .animate-pulse-soft { animation: none !important; }
        }
      `}</style>
    </section>
  );
}