import {
  Menu,
  Search,
  Bell,
  X,
  ChevronDown,
  User2,
  LogOut,
} from "lucide-react";

export default function Header({
  location,
  setMobileOpen,
  isAdmin,
  notifOpen,
  setNotifOpen,
  totalUnread,
  notifications,
  handleNotifClick,
  profileRef,
  profileOpen,
  setProfileOpen,
  displayName,
  user,
  avatarUrl,
  initials,
  goProfile,
  handleLogout,
}) {
  return (
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
              <p className="text-sm font-bold text-slate-900">{displayName}</p>
              <p className="text-[10px] font-bold text-emerald-600 uppercase">
                {user.role}
              </p>
            </div>

            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden bg-blue-600 text-white flex items-center justify-center font-black">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="avatar"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <span>{initials}</span>
              )}
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
  );
}