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

  if (!token && location.pathname !== "/login") {
    return <Navigate to="/login" replace />;
  }

  const isLoginPage = location.pathname === "/login";

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  if (isLoginPage) return <Outlet />;

  return (
    <div className="min-h-screen flex bg-[#F8FAFC]">
      {/* --- SIDEBAR --- */}
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col sticky top-0 h-screen shadow-sm">
        {/* Brand Logo - Using Blue & Green */}
        <div className="h-20 flex items-center px-8 gap-3 border-b border-slate-100">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
            <CheckCircle className="text-white" size={24} />
          </div>
          <h1 className="text-xl font-black text-slate-800 tracking-tight">
            Appoint<span className="text-emerald-500">ment</span>
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-4">
            Management
          </p>

          <NavItem
            to="/dashboard"
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
          />
          <NavItem
            to="/dashboard/users"
            icon={<Users size={20} />}
            label="User"
          />
          <NavItem
            to="/dashboard/customers"
            icon={<UserSquare2 size={20} />}
            label="Customers"
          />
          <NavItem
            to="/dashboard/services"
            icon={<Wrench size={20} />}
            label="Services"
          />

          <div className="pt-6">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-4">
              Appointments
            </p>
            <NavItem
              to="/dashboard/create-appointment"
              icon={<PlusCircle size={20} />}
              label="New Booking"
            />
            <NavItem
              to="/dashboard/pending-appointments"
              icon={<Clock size={20} />}
              label="Pending"
            />
            <NavItem
              to="/dashboard/approved-appointments"
              icon={<CheckCircle size={20} />}
              label="Approved"
            />
            <NavItem
              to="/dashboard/EmployeeDashboard"
              icon={<Clock size={20} />}
              label="Employee Dashboard"
            />
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-6 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all font-bold text-sm"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* HEADER */}
        <header className="h-20 bg-white border-b border-slate-200 sticky top-0 z-10 flex items-center justify-between px-10">
          <div>
            <h2 className="text-lg font-bold text-slate-800 capitalize">
              {location.pathname.split("/").pop().replace("-", " ")}
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center bg-slate-50 border border-slate-200 rounded-full px-4 py-1.5 text-slate-400 focus-within:border-blue-400 transition-all">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none focus:ring-0 text-xs ml-2 text-slate-600 w-32"
              />
            </div>

            <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full border-2 border-white"></span>
            </button>

            {/* Profile Section */}
            <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-800 leading-none">
                  {user?.fullName || "Admin"}
                </p>
                <p className="text-[10px] font-bold text-emerald-600 uppercase mt-1 tracking-tighter">
                  Verified Account
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-black text-sm shadow-md shadow-blue-100">
                {user?.fullName?.charAt(0) || "A"}
              </div>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
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
    NAV ITEM COMPONENT
========================= */
function NavItem({ to, label, icon }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `group flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-bold transition-all
        ${
          isActive
            ? "bg-blue-600 text-white shadow-md shadow-blue-200"
            : "text-slate-500 hover:text-blue-600 hover:bg-blue-50"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <span
            className={`${isActive ? "text-white" : "text-emerald-500 group-hover:text-blue-600"} transition-colors`}
          >
            {icon}
          </span>
          {label}
        </>
      )}
    </NavLink>
  );
}
