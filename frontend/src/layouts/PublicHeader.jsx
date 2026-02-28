// import { NavLink, Link } from "react-router-dom";
// import { Menu, X } from "lucide-react";
// import { useEffect, useState } from "react";

// const navClass = ({ isActive }) =>
//   `px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
//     isActive
//       ? "text-[#3B82F6] bg-[#dee8ff]"
//       : "text-white hover:bg-white/10"
//   }`;

// export default function PublicHeader() {
//   const [open, setOpen] = useState(false);

//   const POS = {
//     logo: { x: -190, y: 0 },
//     nav: { x: -190, y: 0 },
//     login: { x: 0, y: 0 },
//     mobileBtn: { x: 0, y: 0 },
//   };

//   useEffect(() => {
//     const onResize = () => {
//       if (window.innerWidth >= 768) setOpen(false);
//     };
//     window.addEventListener("resize", onResize);
//     return () => window.removeEventListener("resize", onResize);
//   }, []);

//   return (
//     <header className="sticky top-0 z-50 h-16 md:h-20 border-b border-white/10 bg-[#4b5563]/80 backdrop-blur-xl">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">

//         {/* LOGO */}
//         <Link
//           to="/"
//           style={{ transform: `translate(${POS.logo.x}px, ${POS.logo.y}px)` }}
//         >
//           <img src="/logo.png" className="h-10 md:h-45" />
//         </Link>

//         {/* DESKTOP NAV */}
//         <nav
//           className="hidden md:flex items-center gap-3"
//           style={{ transform: `translate(${POS.nav.x}px, ${POS.nav.y}px)` }}
//         >
//           <NavLink to="/" className={navClass}>Home</NavLink>
//           <NavLink to="/services" className={navClass}>Services</NavLink>
//           <NavLink to="/track" className={navClass}>Track</NavLink>
//           <NavLink to="/about" className={navClass}>About</NavLink>
//         </nav>

//         {/* RIGHT SIDE */}
//         <div className="flex items-center gap-2">

//           {/* LOGIN */}
//           <Link
//             to="/login"
//             style={{ transform: `translate(${POS.login.x}px, ${POS.login.y}px)` }}
//             className="hidden sm:inline-flex px-4 py-2 rounded-xl text-white bg-[#2563EB] hover:bg-[#1D4ED8]"
//           >
//             Login
//           </Link>

//           {/* MOBILE MENU */}
//           <button
//             className="md:hidden p-2 rounded-xl bg-white/10"
//             onClick={() => setOpen(!open)}
//           >
//             {open ? <X /> : <Menu />}
//           </button>
//         </div>
//       </div>

//       {/* MOBILE NAV */}
//       {open && (
//         <div className="md:hidden bg-[#4b5563] border-t border-white/10 px-4 py-3 space-y-2">
//           <NavLink to="/" className={navClass}>Home</NavLink>
//           <NavLink to="/services" className={navClass}>Services</NavLink>
//           <NavLink to="/track" className={navClass}>Track</NavLink>
//           <NavLink to="/about" className={navClass}>About</NavLink>
//         </div>
//       )}
//     </header>
//   );
// }

import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import logoImg from "../assets/brand/logo.png";

const navClass = ({ isActive }) =>
  `block px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
    isActive
      ? "text-[#3B82F6] bg-[#dee8ff]"
      : "text-white hover:bg-white/10"
  }`;

export default function PublicHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="sticky top-0 z-50 h-16 md:h-20 border-b border-white/10 bg-[#4b5563]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
        {/* ✅ LOGO (4x weyn) */}
        <Link to="/" className="flex items-center shrink-0">
          <div
            style={{
              height: "45px",
              width: "320px", // ✅ ballaari si 4x u galo
              display: "flex",
              alignItems: "center",
              overflow: "visible",
            }}
          >
            <img
              src={logoImg}
              alt="Appointify Logo"
              draggable="false"
              className="logoImg block w-auto object-contain select-none"
            />
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-3">
          <NavLink to="/" className={navClass}>
            Home
          </NavLink>
          <NavLink to="/services" className={navClass}>
            Services
          </NavLink>
          <NavLink to="/track" className={navClass}>
            Track
          </NavLink>
          <NavLink to="/about" className={navClass}>
            About
          </NavLink>
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="hidden sm:inline-flex px-4 py-2 rounded-xl text-white bg-[#2563EB] hover:bg-[#1D4ED8] transition"
          >
            Login
          </Link>

          <button
            className="md:hidden p-2 rounded-xl bg-white/10 text-white"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* MOBILE NAV */}
      {open && (
        <div className="md:hidden bg-[#4b5563] border-t border-white/10 px-4 py-3 space-y-2">
          <NavLink to="/" className={navClass} onClick={() => setOpen(false)}>
            Home
          </NavLink>
          <NavLink
            to="/services"
            className={navClass}
            onClick={() => setOpen(false)}
          >
            Services
          </NavLink>
          <NavLink to="/track" className={navClass} onClick={() => setOpen(false)}>
            Track
          </NavLink>
          <NavLink to="/about" className={navClass} onClick={() => setOpen(false)}>
            About
          </NavLink>

          <Link
            to="/login"
            onClick={() => setOpen(false)}
            className="block px-3 py-2 rounded-xl text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8]"
          >
            Login
          </Link>
        </div>
      )}

      {/* ✅ SCALE CONTROL */}
      <style>{`
        .logoImg{
          height: 45px !important;
          width: auto !important;

          /* ✅ 4x */
          transform: scale(4);
          transform-origin: left center;

          image-rendering: auto;
          backface-visibility: hidden;
        }

        /* Mobile: u daa 2x */
        @media (max-width: 640px){
          .logoImg{
            transform: scale(2);
          }
        }
      `}</style>
    </header>
  );
}