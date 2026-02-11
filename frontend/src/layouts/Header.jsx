import { Bell, Search, Menu } from "lucide-react";

export default function Header({ user, title, onMenuOpen }) {
  return (
    <header className="h-16 md:h-20 bg-white border-b border-slate-200 sticky top-0 z-20 flex items-center justify-between px-4 md:px-10">
      <div className="flex items-center gap-3">
        <button
          className="lg:hidden text-slate-600"
          onClick={onMenuOpen}
        >
          <Menu />
        </button>

        <h2 className="text-sm md:text-lg font-bold text-slate-800 capitalize">
          {title}
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
  );
}
