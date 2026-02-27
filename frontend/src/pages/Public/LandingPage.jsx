// // import { Link } from "react-router-dom";
// // import { Search, FileText, ArrowRight } from "lucide-react";

// // export default function LandingPage() {
// //   return (
// //     <section className="relative min-h-[calc(100vh-80px-56px)] flex items-center justify-center px-6 bg-slate-950 overflow-hidden">
// //       {/* Soft Background */}
// //       <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pointer-events-none" />
// //       <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(37,99,235,.28),transparent_55%)] pointer-events-none" />
// //       <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(59,130,246,.18),transparent_60%)] pointer-events-none" />

// //       {/* Center Card */}
// //       <div className="relative z-10 w-full max-w-3xl">
// //         <div className="rounded-[28px] p-[1px] bg-gradient-to-br from-blue-600/35 to-white/10 shadow-[0_30px_70px_rgba(0,0,0,.45)]">
// //           <div className="rounded-[27px] bg-white/5 border border-white/10 backdrop-blur-2xl p-8 md:p-12 text-center">
// //             {/* Small badge */}
// //             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/15 border border-blue-400/25 text-blue-100 font-bold text-sm mb-6">
// //               <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
// //               Appointment System
// //             </div>

// //             {/* TITLE */}
// //             <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
// //               KA QABSO BALANTAADA HALKAN 
// //             </h1>

// //             {/* SUBTITLE */}
// //             <p className="mt-5 text-slate-300 text-lg md:text-xl font-medium leading-relaxed">
// //               Si fudud u qabso ballantaada, lana soco dhaqdhaqaaqa codsigaaga.
// //             </p>

// //             {/* BUTTONS */}
// //             <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
// //               <Link
// //                 to="/services"
// //                 className="
// //                   group inline-flex items-center justify-center gap-2
// //                   px-7 py-4 rounded-2xl
// //                   bg-gradient-to-r from-blue-600 to-blue-700
// //                   text-white font-extrabold text-lg
// //                   shadow-lg shadow-blue-600/20
// //                   transition-all duration-300
// //                   hover:-translate-y-1 hover:brightness-110
// //                   focus:outline-none focus:ring-2 focus:ring-blue-400/60
// //                 "
// //               >
// //                 <FileText size={20} />
// //                 Services
// //                 <ArrowRight
// //                   size={18}
// //                   className="transition-transform duration-300 group-hover:translate-x-1"
// //                 />
// //               </Link>

// //               <Link
// //                 to="/track"
// //                 className="
// //                   group inline-flex items-center justify-center gap-2
// //                   px-7 py-4 rounded-2xl
// //                   border border-white/20 bg-white/5
// //                   text-white font-extrabold text-lg
// //                   transition-all duration-300
// //                   hover:-translate-y-1 hover:bg-white/10
// //                   focus:outline-none focus:ring-2 focus:ring-white/30
// //                 "
// //               >
// //                 <Search size={20} />
// //                 Track
// //                 <ArrowRight
// //                   size={18}
// //                   className="transition-transform duration-300 group-hover:translate-x-1"
// //                 />
// //               </Link>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Small footer hint (optional, simple) */}
// //         <p className="mt-6 text-center text-slate-400 font-semibold text-sm">
// //           Door “Services” si aad u bilowdo, ama “Track” si aad u hubiso status-ka.
// //         </p>
// //       </div>
// //     </section>
// //   );
// // }

// import { Link, useLocation } from "react-router-dom";
// import { useEffect } from "react";

// import girlImg from "../../assets/landing/landing-page.png";
// import bgVideo from "../../assets/landing/bg-home.mp4";

// export default function LandingPage() {
//   const location = useLocation();

//   useEffect(() => {
//     if (location.pathname === "/") document.body.style.overflow = "hidden";
//     return () => (document.body.style.overflow = "");
//   }, [location.pathname]);

//   return (
//     <section className="hero-glow relative w-full h-full overflow-hidden">
//       {/* Background video */}
//       <video
//         className="absolute inset-0 w-full h-full object-cover -z-30 scale-[1.05]"
//         src={bgVideo}
//         autoPlay
//         loop
//         muted
//         playsInline
//       />

//       {/* Overlay */}
//       <div className="absolute inset-0 bg-black/35 -z-20" />

//       <div className="relative z-10 w-full h-full px-6 sm:px-10 lg:px-16">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 h-full items-end">

//           {/* Left */}
//           <div className="space-y-7 lg:pb-16">
//             <div className="pt-1 relative z-20">
//               <Link
//                 to="/services"
//                 className="
//                   btn-glow relative inline-flex items-center justify-center rounded-full
//                   px-12 py-4 text-xl font-extrabold text-white
//                   bg-[#2563EB]/30 border border-[#3B82F6]/45
//                   shadow-xl shadow-[#2563EB]/30
//                   transition
//                 "
//               >
//                 <span className="absolute -inset-[3px] rounded-full glow-ring" />
//                 <span className="btn-shine absolute inset-0 rounded-full" />
//                 <span className="relative z-10">Book Now!</span>
//               </Link>
//             </div>
//           </div>

//           {/* Right */}
//           <div className="relative h-full flex justify-center lg:justify-end items-end">
//             <div
//               className="absolute -z-10 right-0 bottom-28 h-[560px] w-[560px] rounded-full blur-3xl opacity-70 animate-pulse-soft"
//               style={{
//                 background:
//                   "radial-gradient(circle at 40% 35%, rgba(59,130,246,0.55), transparent 65%)",
//               }}
//             />

//             <img
//               src={girlImg}
//               alt="Hero"
//               draggable="false"
//               className="relative object-contain max-w-none pointer-events-none"
//               style={{
//                 width: "1100px",
//                 transform: "translateX(90px)",
//                 marginBottom: "8px",
//               }}
//             />

//             <div
//               className="
//                 absolute bottom-0 left-1/2 -translate-x-1/2
//                 w-[1000px] h-24
//                 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.55),transparent_72%)]
//                 blur-2xl opacity-70
//               "
//             />
//           </div>
//         </div>
//       </div>

//       <style>{`
//         .hero-glow {
//           position: relative;
//         }

//         .hero-glow::before {
//           content: "";
//           position: absolute;
//           inset: 8px;
//           border-radius: 18px;
//           border: 1px solid rgba(59,130,246,0.35);
//           box-shadow:
//             0 0 20px rgba(59,130,246,0.3),
//             0 0 80px rgba(59,130,246,0.2);
//           pointer-events: none;
//           animation: borderGlow 3s ease-in-out infinite;
//         }

//         @keyframes borderGlow {
//           0%,100% {
//             box-shadow:
//               0 0 10px rgba(59,130,246,0.2),
//               0 0 40px rgba(59,130,246,0.15);
//           }
//           50% {
//             box-shadow:
//               0 0 35px rgba(96,165,250,0.7),
//               0 0 120px rgba(59,130,246,0.35);
//           }
//         }

//         /* Button hover */
//         .btn-glow {
//           transform: translateY(0);
//           transition: transform .25s ease, box-shadow .25s ease, background .25s ease, border-color .25s ease;
//           overflow: hidden;
//         }

//         .btn-glow:hover {
//           transform: translateY(-2px) scale(1.03);
//           background: rgba(37, 99, 235, 0.40);
//           border-color: rgba(96,165,250,0.75);
//           box-shadow:
//             0 18px 45px rgba(37,99,235,0.35),
//             0 0 28px rgba(96,165,250,0.45);
//         }

//         .btn-shine {
//           pointer-events: none;
//           background: linear-gradient(110deg,
//             transparent 0%,
//             rgba(255,255,255,0.15) 35%,
//             rgba(255,255,255,0.25) 50%,
//             rgba(255,255,255,0.12) 65%,
//             transparent 100%);
//           transform: translateX(-120%);
//           transition: transform .6s ease;
//           opacity: 0.9;
//         }

//         .btn-glow:hover .btn-shine {
//           transform: translateX(120%);
//         }

//         .glow-ring {
//           pointer-events: none;
//           border: 2px solid rgba(59,130,246,0.35);
//           animation: ringPulse 1.7s ease-in-out infinite;
//         }

//         @keyframes ringPulse {
//           0%,100% { opacity: 0.35; }
//           50% { opacity: 1; box-shadow: 0 0 25px rgba(59,130,246,0.6); }
//         }

//         @keyframes pulseSoft {
//           0%,100% { opacity: 0.7; transform: scale(1); }
//           50% { opacity: 1; transform: scale(1.04); }
//         }

//         .animate-pulse-soft {
//           animation: pulseSoft 3.2s ease-in-out infinite;
//         }

//         @media (prefers-reduced-motion: reduce) {
//           * {
//             animation: none !important;
//             transition: none !important;
//           }
//         }
//       `}</style>
//     </section>
//   );
// }

import { Link } from "react-router-dom";
import girlImg from "../../assets/landing/landing-page.png";

export default function LandingPage() {
  // =====================================================
  // ✅ HERO IMAGE (GABADHA) — gooni u maamul (Desktop/Tablet/Mobile)
  // 👉 sizeMin/sizeVW/sizeMax = cabbirka sawirka (responsive)
  // 👉 shiftX / shiftY = bidix/midig & kor/hoos (gaar u ah device kasta)
  // =====================================================
  const HERO_DESKTOP = {
    sizeMin: "900px",
    sizeVW: "180vw",
    sizeMax: "1800px",
    shiftX: "60px", // + = midig, - = bidix
    shiftY: "20px", // - = kor, + = hoos
    anchorX: "right",
    anchorY: "bottom", // footer-ka ha ku dhagsanaato
  };

  const HERO_TABLET = {
    sizeMin: "650px",
    sizeVW: "78vw",
    sizeMax: "1100px",
    shiftX: "0px",
    shiftY: "-10px",
    anchorX: "right",
    anchorY: "bottom",
  };

  const HERO_MOBILE = {
    sizeMin: "420px",
    sizeVW: "92vw",
    sizeMax: "720px",
    shiftX: "0px",
    shiftY: "0px",
    anchorX: "center",
    anchorY: "bottom",
  };

  // =====================================================
  // ✅ TEXT GROUP (block-ka qoraalka) — gooni u maamul (Desktop/Tablet/Mobile)
  // 👉 shiftX/shiftY = text block-ka dhan u rar
  // =====================================================
  const TEXT_DESKTOP = {
    shiftX: "-40px",
    shiftY: "-10px",
    maxWidth: "640px",
    align: "left",
  };

  const TEXT_TABLET = {
    shiftX: "0px",
    shiftY: "-10px",
    maxWidth: "620px",
    align: "left",
  };

  const TEXT_MOBILE = {
    shiftX: "0px",
    shiftY: "-10px",
    maxWidth: "520px",
    align: "center",
  };

  // =====================================================
  // ✅ TITLE (Easy / scheduling / ahead) — gooni u maamul
  // =====================================================
  const TITLE = {
    fontSize: "clamp(56px, 6vw, 120px)",
    lineHeight: "0.95",
    letterSpacing: "-0.02em",
    shiftX: "-140px",
    shiftY: "-100px",
  };

  // =====================================================
  // ✅ DESCRIPTION — gooni u maamul (font + width + shift)
  // (si “monitor” uusan line 2aad ugu dhicin -> width kordhi ama font yar dhig)
  // =====================================================
  const DESC = {
    fontSize: "clamp(16px, 1.25vw, 22px)",
    lineHeight: "1.65",
    maxWidth: "clamp(520px, 42vw, 760px)", // ✅ ballaari si line 1 u sii joogo
    shiftX: "-120px",
    shiftY: "-80px",
  };

  // =====================================================
  // ✅ BUTTON — gooni u maamul (cabbir + position)
  // =====================================================
  const BTN = {
    fontSize: "clamp(18px, 1.4vw, 28px)",
    px: "clamp(26px, 2.6vw, 54px)",
    py: "clamp(14px, 1.6vw, 22px)",
    radius: "clamp(16px, 1.8vw, 28px)",
    shiftX: "-120px",
    shiftY: "-50px",
  };

  return (
    <section
      className="heroSection relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#EAF2FF] via-[#F5F9FF] to-white"
      style={{
        // ===== HERO (Desktop default) =====
        ["--hero-img"]: `url(${girlImg})`,
        ["--hero-size"]: `clamp(${HERO_DESKTOP.sizeMin}, ${HERO_DESKTOP.sizeVW}, ${HERO_DESKTOP.sizeMax})`,
        ["--hero-anchor-x"]: HERO_DESKTOP.anchorX,
        ["--hero-anchor-y"]: HERO_DESKTOP.anchorY,
        ["--hero-shift-x"]: HERO_DESKTOP.shiftX,
        ["--hero-shift-y"]: HERO_DESKTOP.shiftY,

        // ===== TEXT GROUP (Desktop default) =====
        ["--text-shift-x"]: TEXT_DESKTOP.shiftX,
        ["--text-shift-y"]: TEXT_DESKTOP.shiftY,
        ["--text-max-w"]: TEXT_DESKTOP.maxWidth,
        ["--text-align"]: TEXT_DESKTOP.align,
      }}
    >
      {/* BG glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-60 h-60 bg-blue-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 min-h-screen flex items-center">
        <div
          className="space-y-6"
          style={{
            maxWidth: `var(--text-max-w)`,
            transform: `translate(var(--text-shift-x), var(--text-shift-y))`,
            textAlign: `var(--text-align)`,
          }}
        >
          {/* TITLE */}
          <h1
            className="font-extrabold text-[#2563EB]"
            style={{
              fontSize: TITLE.fontSize,
              lineHeight: TITLE.lineHeight,
              letterSpacing: TITLE.letterSpacing,
              transform: `translate(${TITLE.shiftX}, ${TITLE.shiftY})`,
            }}
          >
            Easy <br />
            scheduling <br />
            ahead
          </h1>

          {/* DESCRIPTION (hal line-ka hore “monitor” ha la socdo) */}
          <p
            className="text-gray-600 font-medium"
            style={{
              fontSize: DESC.fontSize,
              lineHeight: DESC.lineHeight,
              maxWidth: DESC.maxWidth,
              transform: `translate(${DESC.shiftX}, ${DESC.shiftY})`,
            }}
          >
            Book your appointment effortlessly and monitor <br /> the progress of your
            application in real time.
          </p>

          {/* BUTTON */}
          <div style={{ transform: `translate(${BTN.shiftX}, ${BTN.shiftY})` }}>
            <Link
              to="/services"
              className="inline-flex items-center justify-center text-white font-extrabold
                         bg-gradient-to-r from-[#2563EB] to-[#4F46E5]
                         shadow-xl hover:scale-105 transition"
              style={{
                fontSize: BTN.fontSize,
                padding: `${BTN.py} ${BTN.px}`,
                borderRadius: BTN.radius,
              }}
            >
              Book Now!
            </Link>
          </div>
        </div>
      </div>

      {/* ✅ RESPONSIVE: media queries ayaa kala qaadaya values-ka (Tablet/Mobile) */}
      <style>{`
        .heroSection{
          background-image: var(--hero-img);
          background-repeat: no-repeat;
          background-size: var(--hero-size);

          /* anchor + shift */
          background-position:
            var(--hero-anchor-x)
            var(--hero-anchor-y);
          background-position:
            calc(
              ${
                HERO_DESKTOP.anchorX === "center"
                  ? "50%"
                  : HERO_DESKTOP.anchorX === "left"
                  ? "0%"
                  : "100%"
              } + var(--hero-shift-x)
            )
            calc(
              ${
                HERO_DESKTOP.anchorY === "top"
                  ? "0%"
                  : HERO_DESKTOP.anchorY === "center"
                  ? "50%"
                  : "100%"
              } + var(--hero-shift-y)
            );
        }

        /* ===== TABLET (<=1024px) ===== */
        @media (max-width: 1024px){
          .heroSection{
            background-size: clamp(${HERO_TABLET.sizeMin}, ${HERO_TABLET.sizeVW}, ${HERO_TABLET.sizeMax});
            background-position:
              ${
                HERO_TABLET.anchorX === "center"
                  ? "50%"
                  : HERO_TABLET.anchorX === "left"
                  ? "0%"
                  : "100%"
              }
              ${
                HERO_TABLET.anchorY === "top"
                  ? "0%"
                  : HERO_TABLET.anchorY === "center"
                  ? "50%"
                  : "100%"
              };
            background-position:
              calc(${
                HERO_TABLET.anchorX === "center"
                  ? "50%"
                  : HERO_TABLET.anchorX === "left"
                  ? "0%"
                  : "100%"
              } + ${HERO_TABLET.shiftX})
              calc(${
                HERO_TABLET.anchorY === "top"
                  ? "0%"
                  : HERO_TABLET.anchorY === "center"
                  ? "50%"
                  : "100%"
              } + ${HERO_TABLET.shiftY});

            --text-shift-x: ${TEXT_TABLET.shiftX};
            --text-shift-y: ${TEXT_TABLET.shiftY};
            --text-max-w: ${TEXT_TABLET.maxWidth};
            --text-align: ${TEXT_TABLET.align};
          }
        }

        /* ===== MOBILE (<=640px) ===== */
        @media (max-width: 640px){
          .heroSection{
            background-size: clamp(${HERO_MOBILE.sizeMin}, ${HERO_MOBILE.sizeVW}, ${HERO_MOBILE.sizeMax});
            background-position:
              ${
                HERO_MOBILE.anchorX === "center"
                  ? "50%"
                  : HERO_MOBILE.anchorX === "left"
                  ? "0%"
                  : "100%"
              }
              ${
                HERO_MOBILE.anchorY === "top"
                  ? "0%"
                  : HERO_MOBILE.anchorY === "center"
                  ? "50%"
                  : "100%"
              };
            background-position:
              calc(${
                HERO_MOBILE.anchorX === "center"
                  ? "50%"
                  : HERO_MOBILE.anchorX === "left"
                  ? "0%"
                  : "100%"
              } + ${HERO_MOBILE.shiftX})
              calc(${
                HERO_MOBILE.anchorY === "top"
                  ? "0%"
                  : HERO_MOBILE.anchorY === "center"
                  ? "50%"
                  : "100%"
              } + ${HERO_MOBILE.shiftY});

            --text-shift-x: ${TEXT_MOBILE.shiftX};
            --text-shift-y: ${TEXT_MOBILE.shiftY};
            --text-max-w: ${TEXT_MOBILE.maxWidth};
            --text-align: ${TEXT_MOBILE.align};
          }
        }
      `}</style>
    </section>
  );
}