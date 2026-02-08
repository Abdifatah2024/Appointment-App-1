// import { useEffect, useMemo, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import {
//   fetchAppointments,
//   updateAppointment,
//   assignUserToAppointment,
// } from "../../Redux/slices/cusomerSlice/appointmentSlice";

// import { fetchUsers } from "../../Redux/slices/userSlices/userSlice";

// import {
//   ClipboardList,
//   Phone,
//   Calendar,
//   Clock,
// } from "lucide-react";

// export default function PendingAppointments() {
//   const dispatch = useDispatch();

//   /* =========================
//      SAFE SELECTORS
//   ========================== */
//   const {
//     list = [],
//     loading,
//     updatingId,
//   } = useSelector((state) => state.appointments || {});

//   const {
//     list: users = [], // ✅ FIX: safe users list
//   } = useSelector((state) => state.users || {});

//   const [selectedUser, setSelectedUser] = useState({});

//   /* =========================
//      LOAD DATA
//   ========================== */
//   useEffect(() => {
//     dispatch(fetchAppointments());
//     dispatch(fetchUsers());
//   }, [dispatch]);

//   const pendingCount = useMemo(() => list.length, [list]);

//   /* =========================
//      ACTIONS
//   ========================== */
//   const approveWithUser = async (appointmentId) => {
//     const userId = selectedUser[appointmentId];
//     if (!userId) {
//       alert("Please select a user before approving");
//       return;
//     }

//     await dispatch(
//       assignUserToAppointment({
//         id: appointmentId,
//         assignedUserId: userId,
//       })
//     );

//     await dispatch(
//       updateAppointment({
//         id: appointmentId,
//         data: { status: "APPROVED" },
//       })
//     );

//     dispatch(fetchAppointments());
//   };

//   const rejectAppointment = async (id) => {
//     await dispatch(
//       updateAppointment({
//         id,
//         data: { status: "REJECTED" },
//       })
//     );

//     dispatch(fetchAppointments());
//   };

//   /* =========================
//      LOADING STATE
//   ========================== */
//   if (loading) {
//     return (
//       <div className="bg-white rounded-xl border p-10 text-center">
//         <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
//         <p className="mt-4 text-gray-500">Loading appointments…</p>
//       </div>
//     );
//   }

//   /* =========================
//      EMPTY STATE
//   ========================== */
//   if (pendingCount === 0) {
//     return (
//       <div className="bg-white rounded-xl border p-12 text-center text-gray-500">
//         <Clock className="w-10 h-10 mx-auto mb-3" />
//         <p className="font-semibold">No pending appointments</p>
//         <p className="text-sm">All requests have been processed</p>
//       </div>
//     );
//   }

//   /* =========================
//      MAIN UI
//   ========================== */
//   return (
//     <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
//       {/* HEADER */}
//       <div className="p-6 border-b flex items-center gap-3">
//         <div className="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center">
//           <ClipboardList className="w-5 h-5" />
//         </div>
//         <div>
//           <h2 className="text-2xl font-bold text-gray-900">
//             Pending Appointments
//           </h2>
//           <p className="text-sm text-gray-500">
//             Assign staff and approve or reject requests
//           </p>
//         </div>

//         <span className="ml-auto px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
//           {pendingCount} Pending
//         </span>
//       </div>

//       {/* TABLE */}
//       <div className="p-6 overflow-x-auto">
//         <table className="w-full border rounded-xl overflow-hidden">
//           <thead className="bg-gray-50 text-xs uppercase text-gray-600">
//             <tr>
//               <th className="px-4 py-3 text-left">Customer</th>
//               <th className="px-4 py-3 text-left">Service</th>
//               <th className="px-4 py-3">Assign User</th>
//               <th className="px-4 py-3 text-center">Actions</th>
//             </tr>
//           </thead>

//           <tbody className="divide-y">
//             {list.map((a) => (
//               <tr key={a._id} className="hover:bg-gray-50">
//                 {/* CUSTOMER */}
//                 <td className="px-4 py-4">
//                   <p className="font-semibold text-gray-900">
//                     {a.customerId?.fullName || "Unknown"}
//                   </p>
//                   <p className="text-sm text-gray-500 flex items-center gap-1">
//                     <Phone className="w-4 h-4" />
//                     {a.customerId?.phone || "-"}
//                   </p>
//                 </td>

//                 {/* SERVICE */}
//                 <td className="px-4 py-4">
//                   <p className="font-semibold text-gray-900">
//                     {a.serviceId?.name}
//                   </p>
//                   <p className="text-sm text-gray-500 flex items-center gap-1">
//                     <Calendar className="w-4 h-4" />
//                     {new Date(a.appointmentDate).toLocaleString()}
//                   </p>
//                 </td>

//                 {/* ASSIGN USER */}
//                 <td className="px-4 py-4">
//                   <select
//                     className="w-full border rounded-lg px-3 py-2 text-sm"
//                     value={selectedUser[a._id] || ""}
//                     onChange={(e) =>
//                       setSelectedUser((prev) => ({
//                         ...prev,
//                         [a._id]: e.target.value,
//                       }))
//                     }
//                   >
//                     <option value="">Select staff</option>
//                     {users.map((u) => (
//                       <option key={u._id} value={u._id}>
//                         {u.fullName}
//                       </option>
//                     ))}
//                   </select>
//                 </td>

//                 {/* ACTIONS */}
//                 <td className="px-4 py-4 flex gap-2 justify-center">
//                   <button
//                     disabled={updatingId === a._id}
//                     onClick={() => approveWithUser(a._id)}
//                     className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700 disabled:opacity-50"
//                   >
//                     Approve
//                   </button>

//                   <button
//                     disabled={updatingId === a._id}
//                     onClick={() => rejectAppointment(a._id)}
//                     className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-semibold hover:bg-red-700 disabled:opacity-50"
//                   >
//                     Reject
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchAppointments,
  updateAppointment,
  assignUserToAppointment,
} from "../../Redux/slices/cusomerSlice/appointmentSlice";

import { fetchUsers } from "../../Redux/slices/userSlices/userSlice";

import {
  ClipboardList,
  Phone,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  FileText,
  IdCard,
  BookOpen, // ✅ SAFE replacement for Passport
} from "lucide-react";

export default function PendingAppointments() {
  const dispatch = useDispatch();

  /* =========================
     SAFE SELECTORS
  ========================== */
  const {
    list = [],
    loading,
    updatingId,
  } = useSelector((state) => state.appointments || {});

  const {
    list: users = [],
  } = useSelector((state) => state.users || {});

  const [selectedUser, setSelectedUser] = useState({});

  /* =========================
     LOAD DATA
  ========================== */
  useEffect(() => {
    dispatch(fetchAppointments());
    dispatch(fetchUsers());
  }, [dispatch]);

  const pendingCount = useMemo(() => list.length, [list]);

  /* =========================
     ACTIONS
  ========================== */
  const approveWithUser = async (appointmentId) => {
    const userId = selectedUser[appointmentId];
    if (!userId) {
      alert("Please select a staff member before approving");
      return;
    }

    await dispatch(
      assignUserToAppointment({
        id: appointmentId,
        assignedUserId: userId,
      })
    );

    await dispatch(
      updateAppointment({
        id: appointmentId,
        data: { status: "APPROVED" },
      })
    );

    dispatch(fetchAppointments());
  };

  const rejectAppointment = async (id) => {
    await dispatch(
      updateAppointment({
        id,
        data: { status: "REJECTED" },
      })
    );

    dispatch(fetchAppointments());
  };

  /* =========================
     LOADING STATE
  ========================== */
  if (loading) {
    return (
      <div className="bg-white rounded-xl border p-10 text-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="mt-4 text-gray-500">Loading appointments…</p>
      </div>
    );
  }

  /* =========================
     EMPTY STATE
  ========================== */
  if (pendingCount === 0) {
    return (
      <div className="bg-white rounded-xl border p-12 text-center text-gray-500">
        <Clock className="w-10 h-10 mx-auto mb-3" />
        <p className="font-semibold">No pending appointments</p>
        <p className="text-sm">All requests have been processed</p>
      </div>
    );
  }

  /* =========================
     MAIN UI
  ========================== */
  return (
    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
      {/* HEADER */}
      <div className="p-6 border-b flex items-center gap-3">
        <div className="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center">
          <ClipboardList className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Pending Appointments
          </h2>
          <p className="text-sm text-gray-500">
            Review documents, assign staff, approve or reject
          </p>
        </div>

        <span className="ml-auto px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
          {pendingCount} Pending
        </span>
      </div>

      {/* TABLE */}
      <div className="p-6 overflow-x-auto">
        <table className="w-full border rounded-xl overflow-hidden">
          <thead className="bg-gray-50 text-xs uppercase text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">Customer</th>
              <th className="px-4 py-3 text-left">Service & Date</th>
              <th className="px-4 py-3 text-left">Documents</th>
              <th className="px-4 py-3">Assign Staff</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {list.map((a) => {
              const missingDocs =
                !a.documentsSubmitted ||
                !a.identityProvided ||
                !a.passportProvided;

              return (
                <tr key={a._id} className="hover:bg-gray-50 align-top">
                  {/* CUSTOMER */}
                  <td className="px-4 py-4">
                    <p className="font-semibold text-gray-900">
                      {a.customerId?.fullName || "Unknown"}
                    </p>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      {a.customerId?.phone || "-"}
                    </p>
                  </td>

                  {/* SERVICE */}
                  <td className="px-4 py-4">
                    <p className="font-semibold">{a.serviceId?.name}</p>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(a.appointmentDate).toLocaleString()}
                    </p>
                  </td>

                  {/* DOCUMENTS */}
                  <td className="px-4 py-4">
                    <div
                      className={`rounded-xl border p-3 space-y-2 ${
                        missingDocs
                          ? "border-red-200 bg-red-50"
                          : "border-green-200 bg-green-50"
                      }`}
                    >
                      <DocRow
                        icon={<FileText className="w-4 h-4" />}
                        label="Documents Submitted"
                        ok={a.documentsSubmitted}
                      />
                      <DocRow
                        icon={<IdCard className="w-4 h-4" />}
                        label="Identity Card"
                        ok={a.identityProvided}
                      />
                      <DocRow
                        icon={<BookOpen className="w-4 h-4" />}
                        label="Passport"
                        ok={a.passportProvided}
                      />

                      <div className="pt-2 text-xs font-semibold">
                        {missingDocs ? (
                          <span className="text-red-700">
                            ❌ Missing required documents
                          </span>
                        ) : (
                          <span className="text-green-700">
                            ✔ All documents provided
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* ASSIGN USER */}
                  <td className="px-4 py-4">
                    <select
                      className="w-full border rounded-lg px-3 py-2 text-sm"
                      value={selectedUser[a._id] || ""}
                      onChange={(e) =>
                        setSelectedUser((prev) => ({
                          ...prev,
                          [a._id]: e.target.value,
                        }))
                      }
                    >
                      <option value="">Select staff</option>
                      {users.map((u) => (
                        <option key={u._id} value={u._id}>
                          {u.fullName}
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* ACTIONS */}
                  <td className="px-4 py-4 flex gap-2 justify-center">
                    <button
                      disabled={updatingId === a._id}
                      onClick={() => approveWithUser(a._id)}
                      className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700 disabled:opacity-50"
                    >
                      Approve
                    </button>

                    <button
                      disabled={updatingId === a._id}
                      onClick={() => rejectAppointment(a._id)}
                      className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-semibold hover:bg-red-700 disabled:opacity-50"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* =========================
   DOCUMENT ROW
========================= */
function DocRow({ icon, label, ok }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      {ok ? (
        <CheckCircle className="w-4 h-4 text-green-600" />
      ) : (
        <XCircle className="w-4 h-4 text-red-600" />
      )}
      {icon}
      <span className={ok ? "text-gray-800" : "text-gray-600"}>
        {label}
      </span>
    </div>
  );
}



