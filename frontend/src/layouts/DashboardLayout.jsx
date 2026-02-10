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
  IdCardLanyard,
  Menu,
  X,
} from "lucide-react";

import { useState } from "react";

export default function DashboardLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);

  const { token, user } = useSelector((state) => state.auth);

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
      {/* MOBILE OVERLAY */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
        fixed lg:sticky top-0 left-0 z-40
        w-72 bg-white border-r border-slate-200
        flex flex-col h-screen shadow-sm
        transform transition-transform duration-300
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
      >
        {/* LOGO + CLOSE */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <CheckCircle className="text-white" size={24} />
            </div>
            <h1 className="text-xl font-black text-slate-800">
              Appoint<span className="text-emerald-500">ment</span>
            </h1>
          </div>

          <button
            className="lg:hidden text-slate-500"
            onClick={() => setMobileOpen(false)}
          >
            <X />
          </button>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 p-4 md:p-6 space-y-6 overflow-y-auto">
          {isAdmin && (
            <>
              <Section title="Management">
                <NavItem to="/dashboard" icon={<LayoutDashboard />} label="Dashboard" setMobileOpen={setMobileOpen} />
                <NavItem to="/dashboard/users" icon={<Users />} label="Users" setMobileOpen={setMobileOpen} />
                <NavItem to="/dashboard/customers" icon={<UserSquare2 />} label="Customers" setMobileOpen={setMobileOpen} />
                <NavItem to="/dashboard/services" icon={<Wrench />} label="Services" setMobileOpen={setMobileOpen} />
              </Section>

              <Section title="Appointments">
                <NavItem to="/dashboard/create-appointment" icon={<PlusCircle />} label="New Booking" setMobileOpen={setMobileOpen} />
                <NavItem to="/dashboard/pending-appointments" icon={<Clock />} label="Pending" setMobileOpen={setMobileOpen} />
                <NavItem to="/dashboard/approved-appointments" icon={<CheckCircle />} label="Approved" setMobileOpen={setMobileOpen} />
              </Section>

              <Section title="Staff">
                <NavItem
                  to="/dashboard/employee"
                  icon={<IdCardLanyard />}
                  label="Employee Dashboard"
                  setMobileOpen={setMobileOpen}
                />
              </Section>
            </>
          )}

          {isStaff && (
            <Section title="Staff Area">
              <NavItem to="/dashboard/customers" icon={<UserSquare2 />} label="Customers" setMobileOpen={setMobileOpen} />
              <NavItem to="/dashboard/create-appointment" icon={<PlusCircle />} label="New Booking" setMobileOpen={setMobileOpen} />
              <NavItem
                to="/dashboard/employee"
                icon={<IdCardLanyard />}
                label="My Dashboard"
                setMobileOpen={setMobileOpen}
              />
            </Section>
          )}

          {isUser && (
            <Section title="My Area">
              <NavItem
                to="/dashboard/employee"
                icon={<Clock />}
                label="My Dashboard"
                setMobileOpen={setMobileOpen}
              />
            </Section>
          )}
        </nav>

        {/* FOOTER */}
        <div className="p-4 md:p-6 border-t border-slate-100">
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
      <div className="flex-1 flex flex-col">
        {/* HEADER */}
        <header className="h-16 md:h-20 bg-white border-b border-slate-200 sticky top-0 z-20 flex items-center justify-between px-4 md:px-10">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden text-slate-600"
              onClick={() => setMobileOpen(true)}
            >
              <Menu />
            </button>

            <h2 className="text-sm md:text-lg font-bold text-slate-800 capitalize">
              {location.pathname.split("/").pop()?.replace("-", " ")}
            </h2>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            <div className="hidden sm:flex items-center bg-slate-50 border rounded-full px-3 py-1">
              <Search size={16} />
              <input
                placeholder="Search..."
                className="bg-transparent border-none text-xs ml-2 w-24 md:w-32 outline-none"
              />
            </div>

            <button className="relative text-slate-400 hover:text-blue-600">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full" />
            </button>

            <div className="flex items-center gap-2 md:gap-3 md:pl-6 md:border-l">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold">{user.fullName}</p>
                <p className="text-[10px] font-bold text-emerald-600 uppercase">
                  {user.role}
                </p>
              </div>

              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-black">
                {user.fullName?.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

/* =========================
    HELPERS
========================= */

function Section({ title, children }) {
  return (
    <div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-4">
        {title}
      </p>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function NavItem({ to, label, icon, setMobileOpen }) {
  return (
    <NavLink
      to={to}
      onClick={() => setMobileOpen(false)}
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
