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
import { Link } from "react-router-dom";
import { Search, FileText, ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <section className="relative min-h-[calc(100vh-80px-56px)] flex items-center justify-center px-6 bg-slate-950 overflow-hidden">

      {/* Minimal Background Glow (lighter now) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,.18),transparent_65%)] animate-pulse pointer-events-none" />

      {/* Floating Soft Light */}
      <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl animate-[float_6s_ease-in-out_infinite] pointer-events-none" />

      {/* Center Content */}
      <div className="relative z-10 w-full max-w-3xl text-center">

        {/* TITLE with fade animation */}
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight animate-[fadeIn_1s_ease-out]">
          KA QABSO BALANTAADA HALKAN
        </h1>

        {/* SUBTITLE */}
        <p className="mt-6 text-slate-300 text-lg md:text-xl font-medium leading-relaxed animate-[fadeIn_1.5s_ease-out]">
          Si fudud u qabso ballantaada, lana soco dhaqdhaqaaqa codsigaaga.
        </p>

        {/* BUTTONS */}
        <div className="mt-12 flex flex-col sm:flex-row gap-5 justify-center animate-[fadeIn_2s_ease-out]">

          <Link
            to="/services"
            className="
              group inline-flex items-center justify-center gap-2
              px-8 py-4 rounded-2xl
              bg-blue-600 text-white font-extrabold text-lg
              shadow-lg shadow-blue-600/30
              transition-all duration-300
              hover:-translate-y-1 hover:bg-blue-700
            "
          >
            <FileText size={20} />
            Services
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-2"
            />
          </Link>

          <Link
            to="/track"
            className="
              group inline-flex items-center justify-center gap-2
              px-8 py-4 rounded-2xl
              border border-white/25 text-white font-extrabold text-lg
              transition-all duration-300
              hover:-translate-y-1 hover:bg-white/10
            "
          >
            <Search size={20} />
            Track
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-2"
            />
          </Link>

        </div>
      </div>

      {/* Custom Animations */}
      <style>
        {`
          @keyframes float {
            0%,100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>

    </section>
  );
}