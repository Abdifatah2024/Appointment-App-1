// import {
//   Outlet,
//   NavLink,
//   useLocation,
//   useNavigate,
//   Navigate,
// } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../Redux/slices/userSlices/authSlice";
// import {
//   LayoutDashboard,
//   Users,
//   UserSquare2,
//   Wrench,
//   PlusCircle,
//   Clock,
//   CheckCircle,
//   LogOut,
//   Bell,
//   Search,
// } from "lucide-react";

// export default function DashboardLayout() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const { token, user } = useSelector((state) => state.auth);

//   /* =======================
//      AUTH SAFETY
//   ======================= */
//   if (!token || !user) {
//     return <Navigate to="/" replace />;
//   }

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/", { replace: true });
//   };

//   return (
//     <div className="min-h-screen flex bg-[#F8FAFC]">
//       {/* ================= SIDEBAR ================= */}
//       <aside className="w-72 bg-white border-r border-slate-200 flex flex-col sticky top-0 h-screen shadow-sm">
//         {/* Logo */}
//         <div className="h-20 flex items-center px-8 gap-3 border-b border-slate-100">
//           <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
//             <CheckCircle className="text-white" size={24} />
//           </div>
//           <h1 className="text-xl font-black text-slate-800">
//             Appoint<span className="text-emerald-500">ment</span>
//           </h1>
//         </div>

//         {/* NAVIGATION */}
//         <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
//           {/* ================= ADMIN MENU ================= */}
//           {user.role === "ADMIN" && (
//             <>
//               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-4">
//                 Management
//               </p>

//               <NavItem to="/dashboard" icon={<LayoutDashboard />} label="Dashboard" />
//               <NavItem to="/dashboard/users" icon={<Users />} label="Users" />
//               <NavItem to="/dashboard/customers" icon={<UserSquare2 />} label="Customers" />
//               <NavItem to="/dashboard/services" icon={<Wrench />} label="Services" />

//               <div className="pt-6">
//                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-4">
//                   Appointments
//                 </p>
//                 <NavItem
//                   to="/dashboard/create-appointment"
//                   icon={<PlusCircle />}
//                   label="New Booking"
//                 />
//                 <NavItem
//                   to="/dashboard/pending-appointments"
//                   icon={<Clock />}
//                   label="Pending"
//                 />
//                 <NavItem
//                   to="/dashboard/approved-appointments"
//                   icon={<CheckCircle />}
//                   label="Approved"
//                 />
//               </div>
//             </>
//           )}

//           {/* ================= USER MENU ================= */}
//           {user.role === "USER" && (
//             <>
//               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-4">
//                 My Area
//               </p>

//               <NavItem
//                 to="/dashboard/employee"
//                 icon={<Clock />}
//                 label="My Dashboard"
//               />
//             </>
//           )}
//         </nav>

//         {/* FOOTER */}
//         <div className="p-6 border-t border-slate-100">
//           <button
//             onClick={handleLogout}
//             className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-rose-500 hover:bg-rose-50 rounded-xl font-bold"
//           >
//             <LogOut size={20} />
//             Sign Out
//           </button>
//         </div>
//       </aside>

//       {/* ================= MAIN ================= */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* HEADER */}
//         <header className="h-20 bg-white border-b border-slate-200 sticky top-0 z-10 flex items-center justify-between px-10">
//           <h2 className="text-lg font-bold text-slate-800 capitalize">
//             {location.pathname.split("/").pop()?.replace("-", " ")}
//           </h2>

//           <div className="flex items-center gap-6">
//             <div className="hidden md:flex items-center bg-slate-50 border rounded-full px-4 py-1.5">
//               <Search size={16} />
//               <input
//                 placeholder="Search..."
//                 className="bg-transparent border-none text-xs ml-2 w-32"
//               />
//             </div>

//             <button className="relative text-slate-400 hover:text-blue-600">
//               <Bell size={20} />
//               <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full" />
//             </button>

//             <div className="flex items-center gap-3 pl-6 border-l">
//               <div className="text-right hidden sm:block">
//                 <p className="text-sm font-bold">{user.fullName}</p>
//                 <p className="text-[10px] font-bold text-emerald-600 uppercase">
//                   {user.role}
//                 </p>
//               </div>
//               <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-black">
//                 {user.fullName?.charAt(0)}
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* CONTENT */}
//         <main className="flex-1 p-8 overflow-y-auto">
//           <div className="max-w-7xl mx-auto">
//             <Outlet />
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

// /* =========================
//     NAV ITEM
// ========================= */
// function NavItem({ to, label, icon }) {
//   return (
//     <NavLink
//       to={to}
//       end
//       className={({ isActive }) =>
//         `flex items-center gap-4 px-4 py-3 rounded-xl font-bold text-sm transition-all
//         ${
//           isActive
//             ? "bg-blue-600 text-white shadow"
//             : "text-slate-500 hover:text-blue-600 hover:bg-blue-50"
//         }`
//       }
//     >
//       <span>{icon}</span>
//       {label}
//     </NavLink>
//   );
// }

import {
  Outlet,
  NavLink,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/slices/userSlices/authSlice";
import {
  LayoutDashboard,
  Users,
  UserSquare2,
  Wrench,
  PlusCircle,
  Clock,
  CheckCircle,
  LogOut,
  Bell,
  Search,
} from "lucide-react";

export default function DashboardLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { token, user } = useSelector((state) => state.auth);

  /* =======================
     AUTH GUARD
  ======================= */
  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  const isAdmin = user.role === "ADMIN" || user.role === "SUPERADMIN";
  const isStaff = user.role === "STAFF";
  const isUser = user.role === "USER";

  const handleLogout = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen flex bg-[#F8FAFC]">
      {/* ================= SIDEBAR ================= */}
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col sticky top-0 h-screen shadow-sm">
        {/* LOGO */}
        <div className="h-20 flex items-center px-8 gap-3 border-b border-slate-100">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <CheckCircle className="text-white" size={24} />
          </div>
          <h1 className="text-xl font-black text-slate-800">
            Appoint<span className="text-emerald-500">ment</span>
          </h1>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 p-6 space-y-2 overflow-y-auto">

          {/* ================= ADMIN ================= */}
          {isAdmin && (
            <>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-4">
                Management
              </p>

              <NavItem to="/dashboard" icon={<LayoutDashboard />} label="Dashboard" />
              <NavItem to="/dashboard/users" icon={<Users />} label="Users" />
              <NavItem to="/dashboard/customers" icon={<UserSquare2 />} label="Customers" />
              <NavItem to="/dashboard/services" icon={<Wrench />} label="Services" />

              <div className="pt-6">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-4">
                  Appointments
                </p>
                <NavItem to="/dashboard/create-appointment" icon={<PlusCircle />} label="New Booking" />
                <NavItem to="/dashboard/pending-appointments" icon={<Clock />} label="Pending" />
                <NavItem to="/dashboard/approved-appointments" icon={<CheckCircle />} label="Approved" />
              </div>

              <div className="pt-6">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-4">
                  My Area
                </p>
                <NavItem to="/dashboard/employee" icon={<Clock />} label="My Dashboard" />
              </div>
            </>
          )}

          {/* ================= STAFF ================= */}
          {isStaff && (
            <>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-4">
                Staff Area
              </p>

              <NavItem to="/dashboard/customers" icon={<UserSquare2 />} label="Customers" />
              <NavItem to="/dashboard/create-appointment" icon={<PlusCircle />} label="New Booking" />
        
            </>
          )}

          {/* ================= USER ================= */}
          {isUser && (
            <>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-4">
                My Area
              </p>

              <NavItem to="/dashboard/employee" icon={<Clock />} label="My Dashboard" />
            </>
          )}
        </nav>

        {/* FOOTER */}
        <div className="p-6 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-rose-500 hover:bg-rose-50 rounded-xl font-bold"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ================= MAIN ================= */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* HEADER */}
        <header className="h-20 bg-white border-b border-slate-200 sticky top-0 z-10 flex items-center justify-between px-10">
          <h2 className="text-lg font-bold text-slate-800 capitalize">
            {location.pathname.split("/").pop()?.replace("-", " ")}
          </h2>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center bg-slate-50 border rounded-full px-4 py-1.5">
              <Search size={16} />
              <input
                placeholder="Search..."
                className="bg-transparent border-none text-xs ml-2 w-32"
              />
            </div>

            <button className="relative text-slate-400 hover:text-blue-600">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full" />
            </button>

            <div className="flex items-center gap-3 pl-6 border-l">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold">{user.fullName}</p>
                <p className="text-[10px] font-bold text-emerald-600 uppercase">
                  {user.role}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-black">
                {user.fullName?.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

/* =========================
    NAV ITEM
========================= */
function NavItem({ to, label, icon }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `flex items-center gap-4 px-4 py-3 rounded-xl font-bold text-sm transition-all
        ${
          isActive
            ? "bg-blue-600 text-white shadow"
            : "text-slate-500 hover:text-blue-600 hover:bg-blue-50"
        }`
      }
    >
      <span>{icon}</span>
      {label}
    </NavLink>
  );
}



