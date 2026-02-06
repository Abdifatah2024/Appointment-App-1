// import { useEffect, useMemo, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchUsers,
//   registerUser,
//   updateUser,
//   updateUserStatus,
//   deleteUserPermanent,
// } from "../Redux/slices/userSlice";

// export default function Users() {
//   const dispatch = useDispatch();
//   const {
//     list,
//     loading,
//     error,
//     registering,
//     updatingId,
//     deletingId,
//   } = useSelector((s) => s.users);

//   // modals
//   const [showRegister, setShowRegister] = useState(false);
//   const [editing, setEditing] = useState(null);
//   const [confirmDelete, setConfirmDelete] = useState(null);

//   // form
//   const [form, setForm] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     role: "USER",
//     status: "PENDING",
//   });

//   useEffect(() => {
//     dispatch(fetchUsers());
//   }, [dispatch]);

//   /* ================= BADGES ================= */
//   const statusBadge = useMemo(
//     () => ({
//       APPROVED: "text-emerald-700 bg-emerald-50 border-emerald-200",
//       PENDING: "text-amber-700 bg-amber-50 border-amber-200",
//       REJECTED: "text-rose-700 bg-rose-50 border-rose-200",
//       DISABLED: "text-slate-600 bg-slate-100 border-slate-200",
//     }),
//     []
//   );

//   /* ================= REGISTER ================= */
//   const submitRegister = (e) => {
//     e.preventDefault();
//     dispatch(
//       registerUser({
//         fullName: form.fullName,
//         email: form.email,
//         password: form.password,
//         role: form.role,
//       })
//     );
//     setShowRegister(false);
//     resetForm();
//   };

//   /* ================= EDIT ================= */
//   const openEdit = (u) => {
//     setEditing(u);
//     setForm({
//       fullName: u.fullName,
//       email: u.email,
//       password: "",
//       role: u.role,
//       status: u.status,
//     });
//   };

//   const saveEdit = (e) => {
//     e.preventDefault();
//     dispatch(
//       updateUser({
//         id: editing._id,
//         data: {
//           fullName: form.fullName,
//           email: form.email,
//           role: form.role,
//           status: form.status,
//         },
//       })
//     );
//     setEditing(null);
//     resetForm();
//   };

//   /* ================= STATUS ================= */
//   const toggleApprove = (u) => {
//     const next = u.status === "APPROVED" ? "PENDING" : "APPROVED";
//     dispatch(updateUserStatus({ id: u._id, status: next }));
//   };

//   /* ================= DELETE ================= */
//   const confirmPermanentDelete = () => {
//     dispatch(deleteUserPermanent(confirmDelete._id));
//     setConfirmDelete(null);
//   };

//   const resetForm = () => {
//     setForm({
//       fullName: "",
//       email: "",
//       password: "",
//       role: "USER",
//       status: "PENDING",
//     });
//   };

//   if (loading)
//     return <p className="p-8 text-slate-500">Loading users...</p>;
//   if (error)
//     return <p className="p-8 text-red-600 font-semibold">{error}</p>;

//   return (
//     <div className="p-6 max-w-7xl mx-auto space-y-6">
//       {/* HEADER */}
//       <div className="flex justify-between items-center">
//         <h2 className="text-3xl font-bold text-slate-900">
//           User Management
//         </h2>

//         <div className="flex gap-3">
//           <button
//             onClick={() => setShowRegister(true)}
//             className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700"
//           >
//             + Register User
//           </button>
//           <button
//             onClick={() => dispatch(fetchUsers())}
//             className="px-6 py-2 bg-slate-100 rounded-xl font-semibold"
//           >
//             Refresh
//           </button>
//         </div>
//       </div>

//       {/* TABLE */}
//       <div className="bg-white rounded-2xl shadow overflow-hidden border">
//         <table className="w-full text-sm">
//           <thead className="bg-slate-50 border-b">
//             <tr>
//               <th className="p-4 text-left">User</th>
//               <th className="p-4 text-left">Role</th>
//               <th className="p-4 text-left">Status</th>
//               <th className="p-4 text-right">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {list.map((u) => {
//               const badge =
//                 statusBadge[u.status] ||
//                 statusBadge.DISABLED;

//               return (
//                 <tr
//                   key={u._id}
//                   className="border-t hover:bg-slate-50"
//                 >
//                   <td className="p-4">
//                     <div className="font-bold text-slate-900">
//                       {u.fullName}
//                     </div>
//                     <div className="text-slate-500">
//                       {u.email}
//                     </div>
//                   </td>

//                   <td className="p-4 font-semibold">
//                     {u.role}
//                   </td>

//                   <td className="p-4">
//                     <span
//                       className={`px-3 py-1 rounded-full text-xs font-bold border ${badge}`}
//                     >
//                       {u.status}
//                     </span>
//                   </td>

//                   <td className="p-4 text-right space-x-3">
//                     <button
//                       onClick={() => openEdit(u)}
//                       className="text-blue-600 font-bold hover:underline"
//                     >
//                       Edit
//                     </button>

//                     <button
//                       onClick={() => toggleApprove(u)}
//                       disabled={updatingId === u._id}
//                       className={`font-bold ${
//                         u.status === "APPROVED"
//                           ? "text-amber-600"
//                           : "text-emerald-600"
//                       }`}
//                     >
//                       {u.status === "APPROVED"
//                         ? "Set Pending"
//                         : "Approve"}
//                     </button>

//                     <button
//                       onClick={() => setConfirmDelete(u)}
//                       disabled={deletingId === u._id}
//                       className="text-rose-600 font-bold"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })}

//             {list.length === 0 && (
//               <tr>
//                 <td
//                   colSpan={4}
//                   className="p-8 text-center text-slate-400"
//                 >
//                   No users found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* ================= REGISTER MODAL ================= */}
//       {showRegister && (
//         <Modal onClose={() => setShowRegister(false)} title="Register User">
//           <form onSubmit={submitRegister} className="space-y-4">
//             <Input
//               placeholder="Full Name"
//               value={form.fullName}
//               onChange={(e) =>
//                 setForm({ ...form, fullName: e.target.value })
//               }
//             />
//             <Input
//               placeholder="Email"
//               value={form.email}
//               onChange={(e) =>
//                 setForm({ ...form, email: e.target.value })
//               }
//             />
//             <Input
//               type="password"
//               placeholder="Password"
//               value={form.password}
//               onChange={(e) =>
//                 setForm({ ...form, password: e.target.value })
//               }
//             />
//             <select
//               className="w-full border rounded-xl px-4 py-3"
//               value={form.role}
//               onChange={(e) =>
//                 setForm({ ...form, role: e.target.value })
//               }
//             >
//               <option value="USER">USER</option>
//               <option value="ADMIN">ADMIN</option>
//             </select>

//             <ModalActions
//               onCancel={() => setShowRegister(false)}
//               loading={registering}
//               submitText="Register"
//             />
//           </form>
//         </Modal>
//       )}

//       {/* ================= EDIT MODAL ================= */}
//       {editing && (
//         <Modal onClose={() => setEditing(null)} title="Edit User">
//           <form onSubmit={saveEdit} className="space-y-4">
//             <Input
//               placeholder="Full Name"
//               value={form.fullName}
//               onChange={(e) =>
//                 setForm({ ...form, fullName: e.target.value })
//               }
//             />
//             <Input
//               placeholder="Email"
//               value={form.email}
//               onChange={(e) =>
//                 setForm({ ...form, email: e.target.value })
//               }
//             />
//             <select
//               className="w-full border rounded-xl px-4 py-3"
//               value={form.role}
//               onChange={(e) =>
//                 setForm({ ...form, role: e.target.value })
//               }
//             >
//               <option value="USER">USER</option>
//               <option value="ADMIN">ADMIN</option>
//             </select>
//             <select
//               className="w-full border rounded-xl px-4 py-3"
//               value={form.status}
//               onChange={(e) =>
//                 setForm({ ...form, status: e.target.value })
//               }
//             >
//               <option value="PENDING">PENDING</option>
//               <option value="APPROVED">APPROVED</option>
//               <option value="REJECTED">REJECTED</option>
//               <option value="DISABLED">DISABLED</option>
//             </select>

//             <ModalActions
//               onCancel={() => setEditing(null)}
//               submitText="Save Changes"
//             />
//           </form>
//         </Modal>
//       )}

//       {/* ================= DELETE MODAL ================= */}
//       {confirmDelete && (
//         <Modal
//           onClose={() => setConfirmDelete(null)}
//           title="Confirm Delete"
//         >
//           <p className="text-slate-600 mb-6">
//             Permanently delete{" "}
//             <span className="font-bold">
//               {confirmDelete.fullName}
//             </span>
//             ? This action cannot be undone.
//           </p>
//           <div className="flex gap-3">
//             <button
//               onClick={() => setConfirmDelete(null)}
//               className="flex-1 py-3 bg-slate-100 rounded-xl font-bold"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={confirmPermanentDelete}
//               className="flex-1 py-3 bg-rose-600 text-white rounded-xl font-bold"
//             >
//               Delete
//             </button>
//           </div>
//         </Modal>
//       )}
//     </div>
//   );
// }

// /* ================= SMALL COMPONENTS ================= */

// function Modal({ title, children, onClose }) {
//   return (
//     <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl w-full max-w-md p-6 relative">
//         <button
//           onClick={onClose}
//           className="absolute right-4 top-4 text-2xl text-slate-400"
//         >
//           ×
//         </button>
//         <h3 className="text-2xl font-bold mb-4">{title}</h3>
//         {children}
//       </div>
//     </div>
//   );
// }

// function Input({ ...props }) {
//   return (
//     <input
//       {...props}
//       className="w-full border rounded-xl px-4 py-3 outline-none focus:ring"
//       required
//     />
//   );
// }

// function ModalActions({ onCancel, submitText, loading }) {
//   return (
//     <div className="flex justify-end gap-3 pt-4">
//       <button
//         type="button"
//         onClick={onCancel}
//         className="px-6 py-2 bg-slate-100 rounded-xl font-bold"
//       >
//         Cancel
//       </button>
//       <button
//         disabled={loading}
//         className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold"
//       >
//         {loading ? "Saving..." : submitText}
//       </button>
//     </div>
//   );
// }
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  updateUser,
  updateUserStatus,
  deleteUserPermanent,
  registerUser,
} from "../../Redux/slices/userSlices/userSlice";

export default function Users() {
  const dispatch = useDispatch();
  const { list, loading, error, registering, updatingId, deletingId } = useSelector(
    (s) => s.users
  );

  // --- UI STATES ---
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
      APPROVED: "text-emerald-700 bg-emerald-50 border-emerald-100",
      PENDING: "text-amber-700 bg-amber-50 border-amber-100",
      REJECTED: "text-rose-700 bg-rose-50 border-rose-100",
      DISABLED: "text-slate-600 bg-slate-100 border-slate-200",
    }),
    []
  );

  // ================= ACTIONS =================
  const closeModals = () => {
    setShowRegister(false);
    setEditing(null);
    setConfirmDelete(null);
    setForm({ fullName: "", email: "", password: "", role: "USER", status: "PENDING" });
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

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-slate-900"></div>
    </div>
  );

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Management</h2>
          <p className="text-slate-500 font-medium">Control user access and system permissions</p>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowRegister(true)}
            className="px-8 py-3.5 bg-slate-900 text-white rounded-2xl font-bold shadow-xl shadow-slate-200 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
          >
            <span className="text-xl">+</span> Register User
          </button>
          <button
            onClick={() => dispatch(fetchUsers())}
            className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl hover:bg-slate-100 text-slate-600 transition-all"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* USERS TABLE */}
      <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-6 text-[11px] font-black uppercase tracking-widest text-slate-400">User Details</th>
                <th className="px-8 py-6 text-[11px] font-black uppercase tracking-widest text-slate-400">Role</th>
                <th className="px-8 py-6 text-[11px] font-black uppercase tracking-widest text-slate-400 text-center">Status</th>
                <th className="px-8 py-6 text-[11px] font-black uppercase tracking-widest text-right text-slate-400">Management</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {list.map((u) => (
                <tr key={u._id} className="hover:bg-slate-50/30 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900 text-lg tracking-tight">{u.fullName}</span>
                      <span className="text-sm text-slate-400 font-medium">{u.email}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 text-[10px] font-black text-slate-500 bg-slate-100 rounded-lg uppercase">
                      {u.role}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className={`px-4 py-1 rounded-full border text-[11px] font-bold ${statusBadge[u.status] || statusBadge.DISABLED}`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end items-center gap-3">
                      <button onClick={() => openEdit(u)} className="px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100 rounded-xl transition-all">
                        Edit
                      </button>
                      <button 
                        onClick={() => toggleApprove(u)} 
                        className={`px-4 py-2 text-sm font-bold rounded-xl transition-all ${
                          u.status === 'APPROVED' ? 'text-amber-600 hover:bg-amber-50' : 'text-emerald-600 hover:bg-emerald-50'
                        }`}
                      >
                        {u.status === 'APPROVED' ? 'Suspend' : 'Approve'}
                      </button>
                      <button 
                        onClick={() => setConfirmDelete(u)}
                        className="px-4 py-2 text-sm font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* REGISTER / EDIT MODAL */}
      {(showRegister || editing) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={closeModals} />
          <form 
            onSubmit={editing ? submitUpdate : submitRegister}
            className="relative w-full max-w-lg bg-white rounded-[3rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 duration-300"
          >
            <div className="p-10 border-b border-slate-50">
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">
                {editing ? "Edit User Profile" : "Register New User"}
              </h3>
            </div>
            
            <div className="p-10 space-y-4">
              <input 
                placeholder="Full Name"
                className="w-full border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-slate-900/5 bg-slate-50 font-bold transition-all" 
                value={form.fullName} 
                onChange={(e) => setForm({...form, fullName: e.target.value})}
                required
              />
              <input 
                placeholder="Email Address"
                className="w-full border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-slate-900/5 bg-slate-50 font-bold transition-all" 
                value={form.email} 
                onChange={(e) => setForm({...form, email: e.target.value})}
                required
              />
              {!editing && (
                <input 
                  type="password"
                  placeholder="Create Password"
                  className="w-full border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-slate-900/5 bg-slate-50 font-bold transition-all" 
                  value={form.password} 
                  onChange={(e) => setForm({...form, password: e.target.value})}
                  required
                />
              )}
              <div className="grid grid-cols-2 gap-4">
                <select 
                  className="border border-slate-200 rounded-2xl px-6 py-4 outline-none bg-white font-bold cursor-pointer"
                  value={form.role}
                  onChange={(e) => setForm({...form, role: e.target.value})}
                >
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
                <select 
                  className="border border-slate-200 rounded-2xl px-6 py-4 outline-none bg-white font-bold cursor-pointer"
                  value={form.status}
                  onChange={(e) => setForm({...form, status: e.target.value})}
                >
                  <option value="PENDING">PENDING</option>
                  <option value="APPROVED">APPROVED</option>
                </select>
              </div>
            </div>

            <div className="p-10 bg-slate-50 flex justify-end gap-4">
               <button type="button" onClick={closeModals} className="font-bold text-slate-400 hover:text-slate-600 transition-colors">Cancel</button>
               <button 
                disabled={registering}
                className="px-10 py-4 bg-slate-900 text-white rounded-[1.5rem] font-bold shadow-xl transition-all"
               >
                {editing ? "Update User" : registering ? "Registering..." : "Complete Registration"}
               </button>
            </div>
          </form>
        </div>
      )}

      {/* PERMANENT DELETE CONFIRMATION */}
      {confirmDelete && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setConfirmDelete(null)} />
          <div className="relative w-full max-w-md bg-white rounded-[3rem] shadow-2xl p-10 text-center animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-rose-100">
               <span className="text-4xl font-black">!</span>
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">Are you sure?</h3>
            <p className="text-slate-500 font-medium mb-8 leading-relaxed">
              You are about to permanently delete <br/>
              <span className="text-rose-600 font-black italic underline">{confirmDelete.fullName}</span> <br/>
              with the role <span className="text-slate-900 font-black uppercase">[{confirmDelete.role}]</span>.
            </p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={handleDelete}
                className="w-full py-4 rounded-2xl bg-rose-600 text-white font-bold hover:bg-rose-700 shadow-xl shadow-rose-200 transition-all active:scale-95"
              >
                Yes, Delete Permanently
              </button>
              <button 
                onClick={() => setConfirmDelete(null)}
                className="w-full py-4 rounded-2xl bg-slate-50 text-slate-500 font-bold hover:bg-slate-200 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
