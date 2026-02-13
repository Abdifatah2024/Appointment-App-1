

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
  CheckCircle2,
  LogOut,
  Bell,
  Search,
  IdCardLanyard,
  Menu,
  X,
  ChevronDown,
  User2,
} from "lucide-react";

import axios from "axios";
import { useEffect, useMemo, useState, useCallback, useRef } from "react";

const SEEN_KEY = "appointment_app_seen_counts_v1";

/* =========================
  LocalStorage helpers
========================= */
function readSeen() {
  try {
    const raw = localStorage.getItem(SEEN_KEY);
    if (!raw) return {};
    const obj = JSON.parse(raw);
    return obj && typeof obj === "object" ? obj : {};
  } catch {
    return {};
  }
}
function writeSeen(obj) {
  try {
    localStorage.setItem(SEEN_KEY, JSON.stringify(obj));
  } catch {}

/* noop */
}

/* =========================
  Time ago helper
========================= */
function timeAgo(input) {
  if (!input) return "Just now";
  if (typeof input === "string" && /ago|just now/i.test(input)) return input;

  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return "Just now";

  const diffMs = Date.now() - d.getTime();
  const sec = Math.floor(diffMs / 1000);

  if (sec < 10) return "Just now";
  if (sec < 60) return `${sec}s ago`;

  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;

  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;

  const day = Math.floor(hr / 24);
  return `${day}d ago`;
}

/* =========================
  Notification mapping
========================= */
function defaultTitle(status) {
  switch ((status || "").toUpperCase()) {
    case "PENDING":
      return "New pending appointment";
    case "APPROVED":
      return "Appointment approved";
    case "COMPLETED":
      return "Appointment completed";
    case "CUSTOMERS":
      return "New customer added";
    case "BOOKINGS":
      return "New booking created";
    case "SERVICES":
      return "Service provided";
    default:
      return "New update";
  }
}

function defaultDesc(status) {
  switch ((status || "").toUpperCase()) {
    case "PENDING":
      return "Appointment cusub ayaa yimid oo pending ah.";
    case "APPROVED":
      return "Mid ka mid ah appointments waa la approved gareeyay.";
    case "COMPLETED":
      return "Appointment ayaa la completed gareeyay.";
    case "CUSTOMERS":
      return "Customer cusub ayaa la diiwaan geliyay.";
    case "BOOKINGS":
      return "Booking cusub ayaa la sameeyay.";
    case "SERVICES":
      return "Customer ayaa service la siiyay.";
    default:
      return "Update cusub ayaa yimid.";
  }
}

function defaultTo(status) {
  switch ((status || "").toUpperCase()) {
    case "PENDING":
      return "/dashboard/pending-appointments";
    case "APPROVED":
      return "/dashboard/approved-appointments";
    case "COMPLETED":
      return "/dashboard/completed-appointments";
    case "CUSTOMERS":
      return "/dashboard/customers";
    case "BOOKINGS":
      return "/dashboard/create-appointment";
    case "SERVICES":
      return "/dashboard/services";
    default:
      return "/dashboard";
  }
}

function getInitials(name) {
  const n = (name || "").trim();
  if (!n) return "U";
  const parts = n.split(" ").filter(Boolean);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase();
}

export default function DashboardLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { token, user, loading } = useSelector((state) => state.auth);

  const API_BASE =
    import.meta?.env?.VITE_API_URL?.replace(/\/$/, "") ||
    "http://localhost:4000";

  /* ✅ Hooks before any return */
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  // ✅ profile dropdown
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  /* =========================
    Counts from backend (TOTALS)
  ========================= */
  const [serverCounts, setServerCounts] = useState({
    PENDING: 0,
    APPROVED: 0,
    COMPLETED: 0,
    CUSTOMERS: 0,
    BOOKINGS: 0,
    SERVICES: 0,
  });

  /* =========================
    Seen counts (local)
  ========================= */
  const [seenCounts, setSeenCounts] = useState(() => readSeen());

  /* =========================
    Dropdown updates from backend (admin only)
  ========================= */
  const [notifications, setNotifications] = useState([]);

  /* ✅ Safe returns after hooks */
  if (loading) return null;
  if (!token || !user) return <Navigate to="/" replace />;

  const isAdmin = user.role === "ADMIN" || user.role === "SUPERADMIN";
  const isStaff = user.role === "STAFF";
  const isUser = user.role === "USER";

  const displayName = user.fullName || user.name || user.username || "User";
  const initials = getInitials(displayName);

  /* =========================
    Unread = max(server - seen, 0)
  ========================= */
  const unreadCounts = useMemo(() => {
    const keys = [
      "PENDING",
      "APPROVED",
      "COMPLETED",
      "CUSTOMERS",
      "BOOKINGS",
      "SERVICES",
    ];

    const out = {};
    for (const k of keys) {
      const s = Number(serverCounts[k] || 0);
      const seen = Number(seenCounts[k] || 0);
      out[k] = Math.max(s - seen, 0);
    }
    return out;
  }, [serverCounts, seenCounts]);

  const totalUnread = useMemo(() => {
    return (
      (unreadCounts.PENDING || 0) +
      (unreadCounts.APPROVED || 0) +
      (unreadCounts.COMPLETED || 0) +
      (unreadCounts.CUSTOMERS || 0) +
      (unreadCounts.BOOKINGS || 0) +
      (unreadCounts.SERVICES || 0)
    );
  }, [unreadCounts]);

  /* =========================
    Mark as seen helper
  ========================= */
  const markSeen = useCallback(
    (key) => {
      setSeenCounts((prev) => {
        const next = {
          ...prev,
          [key]: Number(serverCounts[key] || 0),
        };
        writeSeen(next);
        return next;
      });
    },
    [serverCounts]
  );

  /* =========================
    ✅ Fetch counts + updates (ADMIN only)
  ========================= */
  const fetchCounts = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API_BASE}/api/dashboard/counts`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });

      if (data?.success && data?.data) {
        setServerCounts((prev) => ({
          ...prev,
          PENDING: Number(data.data.PENDING || 0),
          APPROVED: Number(data.data.APPROVED || 0),
          COMPLETED: Number(data.data.COMPLETED || 0),
          CUSTOMERS: Number(data.data.CUSTOMERS || prev.CUSTOMERS || 0),
          BOOKINGS: Number(data.data.BOOKINGS || prev.BOOKINGS || 0),
          SERVICES: Number(data.data.SERVICES || prev.SERVICES || 0),
        }));
      }
    } catch (err) {
      console.log("Counts error:", err?.response?.data || err?.message);
    }
  }, [API_BASE, token]);

  const fetchUpdates = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API_BASE}/api/dashboard/updates`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });

      const arr = Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data)
        ? data
        : [];

      const normalized = arr.map((n, idx) => {
        const status = (n.status || n.type || "").toUpperCase() || "PENDING";
        const createdAt = n.createdAt || n.updatedAt || n.time || n.date;
        return {
          id: n.id || n._id || `${status}-${idx}`,
          status,
          title: n.title || defaultTitle(status),
          desc: n.desc || n.message || defaultDesc(status),
          time: timeAgo(createdAt),
          to: n.to || n.link || defaultTo(status),
        };
      });

      setNotifications(normalized);
    } catch {
      setNotifications([]);
    }
  }, [API_BASE, token]);

  /* =========================
    ✅ POLLING (ADMIN only)
  ========================= */
  useEffect(() => {
    if (!token) return;

    // ✅ ADMIN only: staff/user don't need admin counts
    if (!isAdmin) return;

    fetchCounts();
    fetchUpdates();

    const id = setInterval(() => {
      fetchCounts();
      fetchUpdates();
    }, 10000);

    return () => clearInterval(id);
  }, [token, isAdmin, fetchCounts, fetchUpdates]);

  /* =========================
    ✅ Bell open => refresh (ADMIN only)
  ========================= */
  useEffect(() => {
    if (!token) return;
    if (!isAdmin) return;
    if (notifOpen) {
      fetchCounts();
      fetchUpdates();
    }
  }, [notifOpen, token, isAdmin, fetchCounts, fetchUpdates]);

  /* =========================
    Auto mark as seen when user visits page
  ========================= */
  useEffect(() => {
    if (!isAdmin) return; // admin only for these notifications

    const path = location.pathname;
    const matchAndMark = (key, match) => {
      if (path.includes(match)) markSeen(key);
    };

    matchAndMark("PENDING", "/dashboard/pending-appointments");
    matchAndMark("APPROVED", "/dashboard/approved-appointments");
    matchAndMark("COMPLETED", "/dashboard/completed-appointments");
    matchAndMark("CUSTOMERS", "/dashboard/customers");
    matchAndMark("BOOKINGS", "/dashboard/create-appointment");
    matchAndMark("SERVICES", "/dashboard/services");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, serverCounts, markSeen, isAdmin]);

  /* =========================
    Close profile dropdown on outside click / Esc
  ========================= */
  useEffect(() => {
    const onDown = (e) => {
      if (!profileOpen) return;
      if (e.key === "Escape") setProfileOpen(false);
    };

    const onClick = (e) => {
      if (!profileOpen) return;
      if (!profileRef.current) return;
      if (!profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };

    window.addEventListener("keydown", onDown);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("mousedown", onClick);
    };
  }, [profileOpen]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };

  const handleNotifClick = (to, status) => {
    setNotifOpen(false);
    if (status) markSeen(status);
    navigate(to);
  };

  const handleNavClick = (key) => {
    if (key) markSeen(key);
    setMobileOpen(false);
  };

  const goProfile = () => {
    setProfileOpen(false);
    navigate("/dashboard/profile");
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

          {/* ✅ STAFF: ONLY 3 ITEMS */}
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

            {/* ✅ NOTIFICATIONS (ADMIN only UI) */}
            {isAdmin && (
              <div className="relative">
                <button
                  onClick={() => setNotifOpen((s) => !s)}
                  className="relative text-slate-400 hover:text-blue-600"
                >
                  <Bell size={20} />
                  {totalUnread > 0 && (
                    <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-red-600 text-white text-[10px] font-black flex items-center justify-center">
                      {totalUnread > 99 ? "99+" : totalUnread}
                    </span>
                  )}
                </button>

                {notifOpen && (
                  <div className="absolute right-0 mt-3 w-80 bg-white border border-slate-200 shadow-lg rounded-xl overflow-hidden z-50">
                    <div className="px-4 py-3 font-bold border-b flex items-center justify-between">
                      <span>Latest Updates</span>
                      <button
                        onClick={() => setNotifOpen(false)}
                        className="text-slate-400 hover:text-slate-700"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    <div className="max-h-72 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="px-4 py-6 text-sm text-slate-500">
                          No updates yet.
                        </div>
                      ) : (
                        notifications.map((n) => (
                          <button
                            key={n.id}
                            onClick={() => handleNotifClick(n.to, n.status)}
                            className="w-full text-left px-4 py-3 hover:bg-slate-50 border-b"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-black text-slate-500">
                                {n.status}
                              </span>
                              <span className="text-[10px] text-slate-400">
                                {n.time}
                              </span>
                            </div>

                            <p className="text-sm font-bold text-slate-800 mt-1">
                              {n.title}
                            </p>
                            <p className="text-xs text-slate-500 mt-1">
                              {n.desc}
                            </p>
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ✅ PROFILE DROPDOWN */}
            <div className="relative" ref={profileRef}>
              <button
                type="button"
                onClick={() => setProfileOpen((s) => !s)}
                className="flex items-center gap-2 md:gap-3 md:pl-6 md:border-l hover:bg-slate-50 rounded-xl px-2 py-1 transition"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-slate-900">
                    {displayName}
                  </p>
                  <p className="text-[10px] font-bold text-emerald-600 uppercase">
                    {user.role}
                  </p>
                </div>

                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-black">
                  {initials}
                </div>

                <ChevronDown
                  className="hidden sm:block text-slate-400"
                  size={16}
                />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white border border-slate-200 shadow-lg rounded-xl overflow-hidden z-50">
                  <button
                    onClick={goProfile}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
                  >
                    <User2 size={18} className="text-slate-400" />
                    My Profile
                  </button>

                  <div className="h-px bg-slate-100" />

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-rose-600 hover:bg-rose-50"
                  >
                    <LogOut size={18} />
                    Sign Out
                  </button>
                </div>
              )}
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
