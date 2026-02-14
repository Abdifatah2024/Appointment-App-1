import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserSquare2,
  Wrench,
  PlusCircle,
  Clock,
  CheckCircle,
  CheckCircle2,
  IdCardLanyard,
  X,
  LogOut,
} from "lucide-react";

export default function Sidebar({
  mobileOpen,
  setMobileOpen,
  isAdmin,
  isStaff,
  isUser,
  unreadCounts,
  handleNavClick,
  handleLogout,
}) {
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
        {/* LOGO + CLOSE */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <CheckCircle className="text-white" size={24} />
            </div>
            <h1 className="text-xl font-black text-slate-800">
              Appoint<span className="text-emerald-500">ify</span>
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
        <nav className="flex-1 p-4 md:p-1 space-y-4 overflow-y-auto [ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {isAdmin && (
            <>
              <Section title="Management">
                <NavItem
                  to="/dashboard"
                  icon={<LayoutDashboard />}
                  label="Dashboard"
                  onNav={() => handleNavClick(null)}
                />
                <NavItem
                  to="/dashboard/users"
                  icon={<Users />}
                  label="Users"
                  onNav={() => handleNavClick(null)}
                />
                <NavItem
                  to="/dashboard/customers"
                  icon={<UserSquare2 />}
                  label="Customers"
                  badge={unreadCounts.CUSTOMERS}
                  onNav={() => handleNavClick("CUSTOMERS")}
                />
                <NavItem
                  to="/dashboard/services"
                  icon={<Wrench />}
                  label="Services"
                  badge={unreadCounts.SERVICES}
                  onNav={() => handleNavClick("SERVICES")}
                />
              </Section>

              <Section title="Appointments">
                <NavItem
                  to="/dashboard/create-appointment"
                  icon={<PlusCircle />}
                  label="New Booking"
                  badge={unreadCounts.BOOKINGS}
                  onNav={() => handleNavClick("BOOKINGS")}
                />

                <NavItem
                  to="/dashboard/pending-appointments"
                  icon={<Clock />}
                  label="Pending"
                  badge={unreadCounts.PENDING}
                  onNav={() => handleNavClick("PENDING")}
                />

                <NavItem
                  to="/dashboard/approved-appointments"
                  icon={<CheckCircle />}
                  label="Approved"
                  badge={unreadCounts.APPROVED}
                  onNav={() => handleNavClick("APPROVED")}
                />

                <NavItem
                  to="/dashboard/completed-appointments"
                  icon={<CheckCircle2 />}
                  label="Completed"
                  badge={unreadCounts.COMPLETED}
                  onNav={() => handleNavClick("COMPLETED")}
                />
              </Section>

              <Section title="Staff">
                <NavItem
                  to="/dashboard/employee"
                  icon={<IdCardLanyard />}
                  label="Employee Dashboard"
                  onNav={() => handleNavClick(null)}
                />
              </Section>
            </>
          )}

          {isStaff && (
            <Section title="Staff Area">
              <NavItem
                to="/dashboard/customers"
                icon={<UserSquare2 />}
                label="Customers"
                onNav={() => handleNavClick(null)}
              />
              <NavItem
                to="/dashboard/create-appointment"
                icon={<PlusCircle />}
                label="New Booking"
                onNav={() => handleNavClick(null)}
              />
              <NavItem
                to="/dashboard/employee"
                icon={<IdCardLanyard />}
                label="Employee Dashboard"
                onNav={() => handleNavClick(null)}
              />
            </Section>
          )}

          {isUser && (
            <Section title="My Area">
              <NavItem
                to="/dashboard/employee"
                icon={<Clock />}
                label="My Dashboard"
                onNav={() => handleNavClick(null)}
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
    </>
  );
}

/* --- Helpers for Sidebar --- */
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

function NavItem({ to, label, icon, onNav, badge }) {
  return (
    <NavLink
      to={to}
      onClick={onNav}
      end
      className={({ isActive }) =>
        `flex items-center justify-between gap-4 px-4 py-3 rounded-xl font-bold text-sm transition-all
        ${
          isActive
            ? "bg-blue-600 text-white shadow"
            : "text-slate-500 hover:text-blue-600 hover:bg-blue-50"
        }`
      }
    >
      <div className="flex items-center gap-4">
        <span>{icon}</span>
        {label}
      </div>

      {typeof badge === "number" && badge > 0 && (
        <span className="min-w-[26px] h-6 px-2 rounded-full text-[11px] font-black flex items-center justify-center bg-red-600 text-white">
          {badge}
        </span>
      )}
    </NavLink>
  );
}