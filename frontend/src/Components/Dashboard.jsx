// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   Calendar,
//   Clock,
//   User,
//   XCircle,
//   CheckCircle,
//   AlertTriangle,
// } from "lucide-react";
// import { fetchAppointmentDashboard } from
//   "../Redux/slices/cusomerSlice/appointmentDashboardSlice";

// export default function AppointmentDashboard() {
//   const dispatch = useDispatch();

//   const {
//     loading,
//     totals,
//     byStatus,
//     byGender,
//     usersProgress,
//     lastActivities,
//   } = useSelector((state) => state.appointmentDashboard);

//   useEffect(() => {
//     dispatch(fetchAppointmentDashboard());
//   }, [dispatch]);

//   if (loading) {
//     return (
//       <div className="p-10 text-center">
//         <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
//         <p className="mt-3 text-gray-500">Loading dashboard…</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

//       {/* ===================== TOP STATS ===================== */}
//       <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4">
//         <StatCard title="Total Appointments" value={totals.total} icon={Calendar} />
//         <StatCard title="Pending" value={byStatus.pending} icon={Clock} />
//         <StatCard title="Approved" value={byStatus.approved} icon={CheckCircle} />
//         <StatCard title="Cancelled" value={byStatus.cancelled} icon={XCircle} />
//         <StatCard title="No-Show" value={byStatus.noShow} icon={AlertTriangle} />
//         <StatCard title="Today" value={totals.todayRequests} icon={Calendar} />
//       </div>

//       {/* ===================== MIDDLE ===================== */}
//       <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

//         {/* TODAY OVERVIEW */}
//         <div className="bg-white rounded-2xl border p-5">
//           <h3 className="font-bold text-lg mb-4">Today’s Overview</h3>
//           <ul className="space-y-3">
//             {lastActivities.slice(0, 5).map((a) => (
//               <li key={a._id} className="flex justify-between items-center">
//                 <div>
//                   <p className="font-semibold">
//                     {a.customerId?.fullName}
//                   </p>
//                   <p className="text-sm text-gray-500">
//                     {a.serviceId?.name} •{" "}
//                     {new Date(a.appointmentDate).toLocaleTimeString()}
//                   </p>
//                 </div>
//                 <StatusBadge status={a.status} />
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* GENDER STATS */}
//         <div className="bg-white rounded-2xl border p-5">
//           <h3 className="font-bold text-lg mb-4">Requests by Gender</h3>
//           <div className="space-y-3">
//             <GenderRow label="Male" value={byGender.MALE} />
//             <GenderRow label="Female" value={byGender.FEMALE} />
//             <GenderRow label="Other" value={byGender.OTHER} />
//             <GenderRow label="Unknown" value={byGender.UNKNOWN} />
//           </div>
//         </div>

//         {/* STAFF PERFORMANCE */}
//         <div className="bg-white rounded-2xl border p-5">
//           <h3 className="font-bold text-lg mb-4">Staff Performance</h3>
//           <div className="space-y-3">
//             {usersProgress.map((u) => (
//               <div
//                 key={u.userId}
//                 className="flex justify-between items-center"
//               >
//                 <div>
//                   <p className="font-semibold">{u.fullName}</p>
//                   <p className="text-sm text-gray-500">
//                     Assigned: {u.assigned}
//                   </p>
//                 </div>
//                 <div className="text-right text-sm">
//                   <p className="text-green-600">
//                     Completed: {u.completed}
//                   </p>
//                   <p className="text-yellow-600">
//                     Waiting: {u.approved}
//                   </p>
//                   <p className="text-red-600">
//                     No-Show: {u.noShow}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ===================== RECENT APPOINTMENTS ===================== */}
//       <div className="bg-white rounded-2xl border p-5">
//         <h3 className="font-bold text-lg mb-4">Recent Appointments</h3>
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead className="bg-gray-50 text-gray-600">
//               <tr>
//                 <th className="px-4 py-3 text-left">Customer</th>
//                 <th className="px-4 py-3">Service</th>
//                 <th className="px-4 py-3">Date</th>
//                 <th className="px-4 py-3">Status</th>
//                 <th className="px-4 py-3">Staff</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y">
//               {lastActivities.map((a) => (
//                 <tr key={a._id}>
//                   <td className="px-4 py-3">
//                     {a.customerId?.fullName}
//                   </td>
//                   <td className="px-4 py-3">
//                     {a.serviceId?.name}
//                   </td>
//                   <td className="px-4 py-3">
//                     {new Date(a.appointmentDate).toLocaleDateString()}
//                   </td>
//                   <td className="px-4 py-3">
//                     <StatusBadge status={a.status} />
//                   </td>
//                   <td className="px-4 py-3">
//                     {a.assignedUserId?.fullName || "—"}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//     </div>
//   );
// }

// /* ===================== COMPONENTS ===================== */

// function StatCard({ title, value, icon: Icon }) {
//   return (
//     <div className="bg-white rounded-2xl border p-4 flex items-center gap-4">
//       <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
//         <Icon className="w-6 h-6" />
//       </div>
//       <div>
//         <p className="text-sm text-gray-500">{title}</p>
//         <p className="text-2xl font-bold">{value}</p>
//       </div>
//     </div>
//   );
// }

// function StatusBadge({ status }) {
//   const map = {
//     PENDING: "bg-yellow-100 text-yellow-700",
//     APPROVED: "bg-blue-100 text-blue-700",
//     COMPLETED: "bg-green-100 text-green-700",
//     REJECTED: "bg-red-100 text-red-700",
//     CANCELLED: "bg-gray-200 text-gray-700",
//     NO_SHOW: "bg-orange-100 text-orange-700",
//   };

//   return (
//     <span className={`px-3 py-1 rounded-full text-xs font-semibold ${map[status]}`}>
//       {status.replace("_", " ")}
//     </span>
//   );
// }

// function GenderRow({ label, value }) {
//   return (
//     <div className="flex justify-between text-sm">
//       <span>{label}</span>
//       <span className="font-semibold">{value}</span>
//     </div>
//   );
// }
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import { fetchAppointmentDashboard } from
  "../Redux/slices/cusomerSlice/appointmentDashboardSlice"

export default function AppointmentDashboard() {
  const dispatch = useDispatch();

  const {
    loading,
    totals,
    byStatus,
    lastActivities,
  } = useSelector((state) => state.appointmentDashboard);

  useEffect(() => {
    dispatch(fetchAppointmentDashboard());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="p-10 text-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="mt-3 text-gray-500">Loading dashboard…</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">

      {/* ===== STATS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <Stat title="Total" value={totals.total} icon={Calendar} />
        <Stat title="Today" value={totals.todayRequests} icon={Clock} />
        <Stat title="Pending" value={byStatus.pending} icon={Clock} />
        <Stat title="Approved" value={byStatus.approved} icon={CheckCircle} />
        <Stat title="Completed" value={byStatus.completed} icon={CheckCircle} />
        <Stat title="No-Show" value={byStatus.noShow} icon={AlertTriangle} />
      </div>

      {/* ===== RECENT ===== */}
      <div className="bg-white rounded-2xl border p-5">
        <h3 className="font-bold text-lg mb-4">Recent Appointments</h3>

        {lastActivities.length === 0 ? (
          <p className="text-gray-500 text-sm">
            No recent activity
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left">Customer</th>
                  <th className="px-4 py-2">Service</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Staff</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {lastActivities.map((a) => (
                  <tr key={a._id}>
                    <td className="px-4 py-2">
                      {a.customerId?.fullName}
                    </td>
                    <td className="px-4 py-2">
                      {a.serviceId?.name}
                    </td>
                    <td className="px-4 py-2">
                      {new Date(a.appointmentDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">
                      <Status status={a.status} />
                    </td>
                    <td className="px-4 py-2">
                      {a.assignedUserId?.fullName || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}

/* ===== SMALL COMPONENTS ===== */

function Stat({ title, value, icon: Icon }) {
  return (
    <div className="bg-white border rounded-xl p-4 flex items-center gap-3">
      <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-xs text-gray-500">{title}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
}

function Status({ status }) {
  const map = {
    PENDING: "bg-yellow-100 text-yellow-700",
    APPROVED: "bg-blue-100 text-blue-700",
    COMPLETED: "bg-green-100 text-green-700",
    REJECTED: "bg-red-100 text-red-700",
    NO_SHOW: "bg-orange-100 text-orange-700",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs ${map[status]}`}>
      {status.replace("_", " ")}
    </span>
  );
}


