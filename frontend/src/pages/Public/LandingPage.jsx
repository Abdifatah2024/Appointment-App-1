// import { Link } from "react-router-dom";
// import { CalendarDays, Search } from "lucide-react";

// import bg from "../../assets/landing/bg.png";
// import hero from "../../assets/landing/hero.png";

// export default function LandingPage() {
//   return (
//     // ✅ flex-1: fills the remaining height between header and footer
//     <section
//       className="relative flex-1 flex overflow-hidden"
//       style={{
//         backgroundImage: `url(${bg})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       {/* overlay */}
//       <div className="absolute inset-0 bg-white/35" />

//       {/* ✅ container becomes full height, so background reaches footer */}
//       <div className="relative mx-auto max-w-7xl w-full px-4 md:px-8 py-8 md:py-10 flex items-center">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full">
//           {/* Left */}
//           <div>
//             <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
//               Easy scheduling ahead
//               <span className="block">Your Appointment Online</span>
//             </h1>

//             <p className="mt-4 text-slate-600 text-base md:text-lg max-w-xl">
//               Easily and securely book government services online.
//             </p>

//             <div className="mt-7 flex flex-col sm:flex-row gap-3">
//               <Link
//                 to="/book"
//                 className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-emerald-500 text-white font-black shadow-lg shadow-emerald-500/20 hover:brightness-95 transition"
//               >
//                 <CalendarDays size={18} />
//                 Book Appointment
//               </Link>

//               <Link
//                 to="/track"
//                 className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white/70 border border-slate-200 text-slate-800 font-black shadow-sm hover:bg-white transition"
//               >
//                 <Search size={18} />
//                 Track Appointment
//               </Link>
//             </div>
//           </div>

//           {/* Right (Hero) */}
//           <div className="relative flex justify-center lg:justify-end">
//             <img
//               src={hero}
//               alt="hero"
//               className="w-[420px] sm:w-[520px] md:w-[620px] lg:w-[680px] h-auto object-contain drop-shadow-2xl"
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
import { Link } from "react-router-dom";
import { CalendarDays, Search } from "lucide-react";
import { motion } from "framer-motion"; // 1. Import Framer Motion

import bg from "../../assets/landing/bg.png";
import hero from "../../assets/landing/hero.png";

export default function LandingPage() {
  // Animation Variants
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <section
      className="relative flex-1 flex overflow-hidden min-h-[80vh]"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Enhanced Overlay with Blur */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]" />

      <div className="relative mx-auto max-w-7xl w-full px-6 md:px-8 py-12 md:py-20 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          
          {/* Left Content */}
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="z-10"
          >
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 leading-[1.1]"
            >
              Easy scheduling <br />
              <span className="text-emerald-600">Online.</span>
            </motion.h1>

            <motion.p 
              variants={fadeInUp}
              className="mt-6 text-slate-600 text-lg md:text-xl max-w-xl leading-relaxed"
            >
              Skip the queue. Easily and securely book government services 
              from the comfort of your home.
            </motion.p>

            <motion.div 
              variants={fadeInUp}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/book"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-emerald-500 text-white font-bold shadow-xl shadow-emerald-500/25 hover:bg-emerald-600 transition-colors w-full sm:w-auto"
                >
                  <CalendarDays size={20} />
                  Book Appointment
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/track"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200 text-slate-800 font-bold shadow-sm hover:bg-white transition-colors w-full sm:w-auto"
                >
                  <Search size={20} />
                  Track Status
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Hero Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Subtle "Glow" behind image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-emerald-200/50 rounded-full blur-[100px] -z-10" />
            
            <motion.img
              src={hero}
              alt="hero"
              // Floating animation
              animate={{ y: [0, -20, 0] }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="w-[450px] md:w-[600px] lg:w-[700px] h-auto object-contain drop-shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}