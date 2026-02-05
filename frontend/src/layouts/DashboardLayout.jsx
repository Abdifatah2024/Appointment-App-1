import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/slices/authSlice";

export default function DashboardLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { token, user } = useSelector((state) => state.auth);

  // Hide layout on login page
  const isLoginPage = location.pathname === "/login";

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  // If on login page, render only outlet (no sidebar/header)
  if (isLoginPage) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        <div className="h-16 flex items-center justify-center border-b">
          <h1 className="text-xl font-bold text-blue-600">
            Appointment System
          </h1>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <NavItem to="/dashboard" label="Dashboard" />
          <NavItem to="/dashboard/users" label="Users" />
          <NavItem to="/dashboard/students" label="Students" />
          <NavItem to="/dashboard/teachers" label="Teachers" />
          <NavItem to="/dashboard/payments" label="Payments" />
          <NavItem to="/dashboard/reports" label="Reports" />
        </nav>

        <div className="p-4 border-t text-sm text-gray-500 text-center">
          © {new Date().getFullYear()}
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">
        {/* HEADER */}
        <header className="h-16 bg-white shadow flex items-center justify-between px-6">
          <h2 className="text-lg font-semibold text-gray-700">
            Dashboard
          </h2>

          {/* LOGOUT BUTTON */}
          {token && (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {user?.fullName || user?.email}
              </span>

              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          )}
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

/* =========================
   NAV ITEM COMPONENT
========================= */
function NavItem({ to, label }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `flex items-center px-4 py-2 rounded-lg text-sm font-medium transition
        ${
          isActive
            ? "bg-blue-600 text-white"
            : "text-gray-700 hover:bg-gray-100"
        }`
      }
    >
      {label}
    </NavLink>
  );
}
