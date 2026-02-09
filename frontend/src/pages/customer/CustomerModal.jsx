import { useEffect, useState } from "react";
import {
  X,
  User,
  Phone,
  Mail,
  ChevronRight,
  Loader2,
  CheckCircle2,
} from "lucide-react";

export default function CustomerModal({
  open,
  onClose,
  onSubmit,
  loading,
  initialData,
}) {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    gender: "MALE",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        fullName: initialData.fullName || "",
        phone: initialData.phone || "",
        email: initialData.email || "",
        gender: initialData.gender || "MALE",
      });
    } else {
      setForm({
        fullName: "",
        phone: "",
        email: "",
        gender: "MALE",
      });
    }
  }, [initialData, open]); // Added open to dependency to reset when closing/opening

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenderSelect = (val) => {
    setForm((prev) => ({ ...prev, gender: val }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* OVERLAY */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* MODAL CARD */}
      <div className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl shadow-slate-500/20 overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
        {/* HEADER */}
        <div className="px-8 pt-8 pb-6 flex justify-between items-center border-b border-slate-50">
          <div>
            <h2 className="text-xl font-black text-slate-800 tracking-tight">
              {initialData ? "Edit Profile" : "New Registration"}
            </h2>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
              Customer Management
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {/* FULL NAME */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 ml-1 text-[10px] font-black text-slate-400 uppercase tracking-wider">
              <User size={12} /> Full Name
            </label>
            <input
              name="fullName"
              required
              placeholder="e.g. John Doe"
              value={form.fullName}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3.5 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all font-medium text-slate-700"
            />
          </div>

          {/* CONTACT GROUP */}
          <div className="grid grid-cols-1 gap-5">
            {/* PHONE */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 ml-1 text-[10px] font-black text-slate-400 uppercase tracking-wider">
                <Phone size={12} /> Phone Number
              </label>
              <input
                name="phone"
                required
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={form.phone}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3.5 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all font-medium text-slate-700 font-mono"
              />
            </div>

            {/* EMAIL */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 ml-1 text-[10px] font-black text-slate-400 uppercase tracking-wider">
                <Mail size={12} /> Email Address
              </label>
              <input
                name="email"
                type="email"
                placeholder="optional@example.com"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3.5 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all font-medium text-slate-700"
              />
            </div>
          </div>

          {/* GENDER SELECTION (Custom Toggle) */}
          <div className="space-y-2">
            <label className="ml-1 text-[10px] font-black text-slate-400 uppercase tracking-wider">
              Gender Identity
            </label>
            <div className="flex p-1 bg-slate-100 rounded-2xl gap-1">
              {["MALE", "FEMALE"].map((gender) => (
                <button
                  key={gender}
                  type="button"
                  onClick={() => handleGenderSelect(gender)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all ${
                    form.gender === gender
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {gender}
                </button>
              ))}
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-4 border border-slate-100 text-slate-400 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-[2] bg-blue-600 hover:bg-blue-700 text-white px-4 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-lg shadow-blue-100 hover:shadow-blue-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                <>
                  {initialData ? "Update Record" : "Confirm Registration"}
                  <CheckCircle2 size={16} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
