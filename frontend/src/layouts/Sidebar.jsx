import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserSquare2,
  Wrench,
  PlusCircle,
  Clock,
  CheckCircle,
  LogOut,
  IdCardLanyard,
  X,
} from "lucide-react";

export default function Sidebar({
  user,
  mobileOpen,
  setMobileOpen,
  onLogout,
}) {
  const isAdmin = ["ADMIN", "SUPERADMIN"].includes(user.role);
  const isStaff = user.role === "STAFF";
  const isUser = user.role === "USER";

  return (
    <>
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
        />
      )}

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
        {/* LOGO */}
        <div className="h-20 flex items-center justify-between px-6 border-b">
          <h1 className="text-xl font-black">
            Appoint<span className="text-emerald-500">ment</span>
          </h1>

          <button className="lg:hidden" onClick={() => setMobileOpen(false)}>
            <X />
          </button>
        </div>

        <nav className="flex-1 p-6 space-y-6 overflow-y-auto">
          {isAdmin && (
            <>
              <Section title="Management">
                <NavItem to="/dashboard" icon={<LayoutDashboard />} label="Dashboard" />
                <NavItem to="/dashboard/users" icon={<Users />} label="Users" />
                <NavItem to="/dashboard/customers" icon={<UserSquare2 />} label="Customers" />
                <NavItem to="/dashboard/services" icon={<Wrench />} label="Services" />
              </Section>

              <Section title="Appointments">
                <NavItem to="/dashboard/create-appointment" icon={<PlusCircle />} label="New Booking" />
                <NavItem to="/dashboard/pending-appointments" icon={<Clock />} label="Pending" />
                <NavItem to="/dashboard/approved-appointments" icon={<CheckCircle />} label="Approved" />
              </Section>

              <Section title="Staff">
                <NavItem to="/dashboard/employee" icon={<IdCardLanyard />} label="Employee Dashboard" />
              </Section>
            </>
          )}

          {isStaff && (
            <Section title="Staff Area">
              <NavItem to="/dashboard/customers" icon={<UserSquare2 />} label="Customers" />
              <NavItem to="/dashboard/create-appointment" icon={<PlusCircle />} label="New Booking" />
              <NavItem to="/dashboard/employee" icon={<IdCardLanyard />} label="My Dashboard" />
            </Section>
          )}

          {isUser && (
            <Section title="My Area">
              <NavItem to="/dashboard/employee" icon={<Clock />} label="My Dashboard" />
            </Section>
          )}
        </nav>

        <div className="p-6 border-t">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-rose-500 hover:bg-rose-50 rounded-xl font-bold"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <p className="text-[10px] font-bold text-slate-400 uppercase mb-3">
        {title}
      </p>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function NavItem({ to, label, icon }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `flex items-center gap-4 px-4 py-3 rounded-xl font-bold text-sm
        ${
          isActive
            ? "bg-blue-600 text-white shadow"
            : "text-slate-500 hover:bg-blue-50 hover:text-blue-600"
        }`
      }
    >
      {icon}
      {label}
    </NavLink>
  );
}
