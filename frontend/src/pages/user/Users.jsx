import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  UserPlus,
  RefreshCw,
  Edit,
  CheckCircle,
  Slash,
  Trash2,
  AlertCircle,
  X,
  UserCheck,
  Mail,
  Shield,
} from "lucide-react";
import {
  fetchUsers,
  updateUser,
  updateUserStatus,
  deleteUserPermanent,
  registerUser,
} from "../../Redux/slices/userSlices/userSlice";

export default function Users() {
  const dispatch = useDispatch();
  const { list, loading, registering } = useSelector((s) => s.users);

  const [editing, setEditing] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "USER",
    status: "PENDING",
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const statusBadge = useMemo(
    () => ({
      APPROVED: "text-emerald-600 bg-emerald-50 border-emerald-100",
      PENDING: "text-blue-600 bg-blue-50 border-blue-100",
      REJECTED: "text-rose-600 bg-rose-50 border-rose-100",
      DISABLED: "text-slate-400 bg-slate-50 border-slate-200",
    }),
    [],
  );

  // ================= ACTIONS =================
  const closeModals = () => {
    setShowRegister(false);
    setEditing(null);
    setConfirmDelete(null);
    setForm({
      fullName: "",
      email: "",
      password: "",
      role: "USER",
      status: "PENDING",
    });
  };

  const submitRegister = (e) => {
    e.preventDefault();
    dispatch(registerUser(form));
    closeModals();
  };

  const openEdit = (u) => {
    setEditing(u);
    setForm({
      fullName: u.fullName || "",
      email: u.email || "",
      role: u.role || "USER",
      status: u.status || "PENDING",
    });
  };

  const submitUpdate = (e) => {
    e.preventDefault();
    dispatch(updateUser({ id: editing._id, data: form }));
    closeModals();
  };

  const handleDelete = () => {
    if (confirmDelete) {
      dispatch(deleteUserPermanent(confirmDelete._id));
      setConfirmDelete(null);
    }
  };

  const toggleApprove = (u) => {
    const next = u.status === "APPROVED" ? "PENDING" : "APPROVED";
    dispatch(updateUserStatus({ id: u._id, status: next }));
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <RefreshCw className="w-10 h-10 text-blue-600 animate-spin mb-4" />
        <p className="text-slate-400 font-bold animate-pulse">
          Syncing User Data...
        </p>
      </div>
    );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
            <UserCheck size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">
              Access Management
            </h2>
            <p className="text-slate-500 text-sm font-medium">
              Configure team roles and system permissions
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowRegister(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 hover:-translate-y-0.5 transition-all flex items-center gap-2"
          >
            <UserPlus size={18} /> Register User
          </button>
          <button
            onClick={() => dispatch(fetchUsers())}
            className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 transition-all"
          >
            <RefreshCw size={18} />
          </button>
        </div>
      </div>

      {/* USERS TABLE */}
      <div className="bg-white border border-slate-200 rounded-[2rem] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-5 text-[11px] font-black uppercase tracking-widest text-slate-400">
                  Identity
                </th>
                <th className="px-8 py-5 text-[11px] font-black uppercase tracking-widest text-slate-400">
                  Access Level
                </th>
                <th className="px-8 py-5 text-[11px] font-black uppercase tracking-widest text-slate-400 text-center">
                  Security Status
                </th>
                <th className="px-8 py-5 text-[11px] font-black uppercase tracking-widest text-right text-slate-400">
                  Controls
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {list.map((u) => (
                <tr
                  key={u._id}
                  className="group hover:bg-blue-50/30 transition-colors"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-black text-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                        {u.fullName?.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-700 tracking-tight">
                          {u.fullName}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-slate-400">
                          <Mail size={10} />
                          {u.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Shield size={14} className="text-slate-300" />
                      <span className="text-xs font-black uppercase">
                        {u.role}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <span
                      className={`px-4 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-wider ${statusBadge[u.status] || statusBadge.DISABLED}`}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex justify-end items-center gap-2">
                      <button
                        onClick={() => openEdit(u)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        title="Edit User"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => toggleApprove(u)}
                        className={`p-2 rounded-lg transition-all ${
                          u.status === "APPROVED"
                            ? "text-amber-500 hover:bg-amber-50"
                            : "text-emerald-500 hover:bg-emerald-50"
                        }`}
                        title={
                          u.status === "APPROVED"
                            ? "Suspend Account"
                            : "Approve Account"
                        }
                      >
                        {u.status === "APPROVED" ? (
                          <Slash size={16} />
                        ) : (
                          <CheckCircle size={16} />
                        )}
                      </button>
                      <button
                        onClick={() => setConfirmDelete(u)}
                        className="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                        title="Delete Permanently"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FORM MODAL */}
      {(showRegister || editing) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"
            onClick={closeModals}
          />
          <form
            onSubmit={editing ? submitUpdate : submitRegister}
            className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
          >
            <div className="px-10 py-8 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-black text-slate-800 tracking-tight">
                {editing ? "Update User Account" : "Add Team Member"}
              </h3>
              <button
                type="button"
                onClick={closeModals}
                className="p-2 hover:bg-slate-100 rounded-full text-slate-400"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-10 space-y-5">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2">
                  Display Name
                </label>
                <input
                  placeholder="e.g. John Doe"
                  className="w-full border border-slate-200 rounded-xl px-5 py-3.5 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                  value={form.fullName}
                  onChange={(e) =>
                    setForm({ ...form, fullName: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2">
                  Email Address
                </label>
                <input
                  placeholder="john@example.com"
                  className="w-full border border-slate-200 rounded-xl px-5 py-3.5 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>

              {!editing && (
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-2">
                    Access Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full border border-slate-200 rounded-xl px-5 py-3.5 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    required
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-2">
                    System Role
                  </label>
                  <select
                    className="w-full border border-slate-200 rounded-xl px-5 py-3.5 outline-none bg-slate-50 font-bold cursor-pointer"
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                  >
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                    <option value="STAFF">STAFF</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-2">
                    Initial Status
                  </label>
                  <select
                    className="w-full border border-slate-200 rounded-xl px-5 py-3.5 outline-none bg-slate-50 font-bold cursor-pointer"
                    value={form.status}
                    onChange={(e) =>
                      setForm({ ...form, status: e.target.value })
                    }
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="APPROVED">APPROVED</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="px-10 py-8 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeModals}
                className="px-6 py-3 font-bold text-slate-400 hover:text-slate-600 transition-colors"
              >
                Discard
              </button>
              <button
                disabled={registering}
                className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all"
              >
                {editing
                  ? "Save Changes"
                  : registering
                    ? "Processing..."
                    : "Confirm & Register"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* DELETE DIALOG */}
      {confirmDelete && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
            onClick={() => setConfirmDelete(null)}
          />
          <div className="relative w-full max-w-sm bg-white rounded-[2.5rem] shadow-2xl p-8 text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-rose-100">
              <AlertCircle size={32} />
            </div>
            <h3 className="text-xl font-black text-slate-800 mb-2">
              Delete Account?
            </h3>
            <p className="text-slate-500 text-sm font-medium mb-8">
              This will permanently remove{" "}
              <span className="text-slate-800 font-bold">
                {confirmDelete.fullName}
              </span>{" "}
              from the system. This action cannot be undone.
            </p>
            <div className="flex flex-col gap-2">
              <button
                onClick={handleDelete}
                className="w-full py-3.5 rounded-xl bg-rose-600 text-white font-bold hover:bg-rose-700 shadow-lg shadow-rose-100 transition-all"
              >
                Delete Permanently
              </button>
              <button
                onClick={() => setConfirmDelete(null)}
                className="w-full py-3.5 rounded-xl bg-slate-100 text-slate-600 font-bold hover:bg-slate-200 transition-all"
              >
                Keep Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
