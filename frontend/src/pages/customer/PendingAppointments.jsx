
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchAppointments,
//   updateAppointment,
// } from "../../Redux/slices/cusomerSlice/appointmentSlice";
// import {
//   CheckCircle,
//   XCircle,
//   Clock,
//   FileText,
//   User,
//   Calendar,
//   Phone,
//   AlertTriangle,
// } from "lucide-react";

// export default function PendingAppointments() {
//   const dispatch = useDispatch();
//   const { list, loading, updatingId } = useSelector(
//     (state) => state.appointments
//   );

//   useEffect(() => {
//     dispatch(fetchAppointments());
//   }, [dispatch]);

//   const changeStatus = (id, status) => {
//     dispatch(updateAppointment({ id, data: { status } })).then(() =>
//       dispatch(fetchAppointments())
//     );
//   };

//   /* =======================
//      LOADING STATE
//   ======================== */
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-[300px]">
//         <div className="text-center">
//           <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
//           <p className="text-gray-500 font-medium">Loading appointments...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white rounded-2xl shadow p-6 border">
//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h2 className="text-2xl font-bold text-gray-800">
//             Pending Appointments
//           </h2>
//           <p className="text-sm text-gray-500">
//             Review appointments & check missing documents
//           </p>
//         </div>

//         <span className="px-4 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm">
//           {list.length} Pending
//         </span>
//       </div>

//       {/* EMPTY STATE */}
//       {list.length === 0 ? (
//         <div className="border border-dashed rounded-xl py-12 text-center">
//           <Clock className="mx-auto w-12 h-12 text-gray-300 mb-3" />
//           <p className="font-medium text-gray-500">
//             No pending appointments
//           </p>
//         </div>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="w-full border rounded-xl overflow-hidden">
//             <thead className="bg-gray-100 text-xs text-gray-600 uppercase">
//               <tr>
//                 <th className="p-4 text-left">Customer</th>
//                 <th className="p-4 text-left">Service & Date</th>
//                 <th className="p-4 text-left">Documents</th>
//                 <th className="p-4 text-center">Actions</th>
//               </tr>
//             </thead>

//             <tbody className="divide-y">
//               {list.map((a) => {
//                 const missingDocs =
//                   !a.documentsSubmitted ||
//                   !a.identityProvided ||
//                   !a.passportProvided;

//                 return (
//                   <tr key={a._id} className="hover:bg-gray-50">
//                     {/* CUSTOMER */}
//                     <td className="p-4">
//                       <div className="flex items-start gap-3">
//                         <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
//                           <User className="w-5 h-5 text-blue-600" />
//                         </div>
//                         <div>
//                           <p className="font-semibold text-gray-800">
//                             {a.customerId?.fullName || "Unknown"}
//                           </p>
//                           <p className="text-sm text-gray-500 flex items-center gap-1">
//                             <Phone className="w-3 h-3" />
//                             {a.customerId?.phone || "No phone"}
//                           </p>
//                         </div>
//                       </div>
//                     </td>

//                     {/* SERVICE */}
//                     <td className="p-4">
//                       <p className="inline-block bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium mb-2">
//                         {a.serviceId?.name || "Unknown Service"}
//                       </p>
//                       <p className="text-sm text-gray-600 flex items-center gap-1">
//                         <Calendar className="w-4 h-4 text-gray-400" />
//                         {new Date(a.appointmentDate).toLocaleString()}
//                       </p>
//                     </td>

//                     {/* DOCUMENT STATUS */}
//                     <td className="p-4">
//                       {missingDocs ? (
//                         <div className="bg-red-50 border border-red-200 rounded-lg p-3">
//                           <div className="flex items-center gap-2 text-red-700 font-medium mb-2">
//                             <AlertTriangle className="w-4 h-4" />
//                             Required Documents
//                           </div>

//                           <ul className="text-sm space-y-1">
//                             <li className="flex items-center gap-1">
//                               {a.identityProvided ? (
//                                 <CheckCircle className="w-4 h-4 text-green-600" />
//                               ) : (
//                                 <XCircle className="w-4 h-4 text-red-500" />
//                               )}
//                               Identity Card
//                             </li>
//                             <li className="flex items-center gap-1">
//                               {a.passportProvided ? (
//                                 <CheckCircle className="w-4 h-4 text-green-600" />
//                               ) : (
//                                 <XCircle className="w-4 h-4 text-red-500" />
//                               )}
//                               Passport
//                             </li>
//                           </ul>
//                         </div>
//                       ) : (
//                         <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-green-700 font-medium flex items-center gap-2">
//                           <CheckCircle className="w-4 h-4" />
//                           All documents submitted
//                         </div>
//                       )}
//                     </td>

//                     {/* ACTIONS */}
//                     <td className="p-4 text-center">
//                       <div className="flex flex-col gap-2 min-w-[160px]">
//                         <button
//                           disabled={updatingId === a._id}
//                           onClick={() => changeStatus(a._id, "APPROVED")}
//                           className="bg-green-600 hover:bg-green-700 text-white rounded-lg py-2 text-sm font-medium disabled:opacity-50"
//                         >
//                           Approve
//                         </button>

//                         <button
//                           disabled={updatingId === a._id}
//                           onClick={() => changeStatus(a._id, "REJECTED")}
//                           className="bg-red-600 hover:bg-red-700 text-white rounded-lg py-2 text-sm font-medium disabled:opacity-50"
//                         >
//                           Reject
//                         </button>

//                                            </div>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAppointments,
  updateAppointment,
} from "../../Redux/slices/cusomerSlice/appointmentSlice";
import {
  CheckCircle,
  XCircle,
  Clock,
  User,
  Calendar,
  Phone,
  AlertTriangle,
  ClipboardList,
} from "lucide-react";

export default function PendingAppointments() {
  const dispatch = useDispatch();
  const { list, loading, updatingId } = useSelector((state) => state.appointments);

  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  const changeStatus = (id, status) => {
    dispatch(updateAppointment({ id, data: { status } })).then(() =>
      dispatch(fetchAppointments())
    );
  };

  const pendingCount = useMemo(() => (Array.isArray(list) ? list.length : 0), [list]);

  /* =======================
     LOADING STATE
  ======================== */
  if (loading) {
    return (
      <div className="bg-white rounded-2xl border shadow-sm p-10">
        <div className="flex flex-col items-center justify-center gap-3 min-h-[260px]">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600 font-medium">Loading appointments...</p>
          <p className="text-xs text-gray-400">Please wait a moment</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
      {/* HEADER */}
      <div className="p-6 md:p-7 border-b bg-gradient-to-r from-blue-50 via-white to-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
              <ClipboardList className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Pending Appointments</h2>
              <p className="text-sm text-gray-500">
                Review appointments, verify documents, and approve/reject.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold">
              {pendingCount} Pending
            </span>
          </div>
        </div>
      </div>

      {/* EMPTY STATE */}
      {pendingCount === 0 ? (
        <div className="p-10">
          <div className="border border-dashed rounded-2xl py-14 text-center bg-gray-50">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-white border flex items-center justify-center shadow-sm mb-4">
              <Clock className="w-7 h-7 text-gray-400" />
            </div>
            <p className="font-semibold text-gray-700">No pending appointments</p>
            <p className="text-sm text-gray-500 mt-1">
              New requests will appear here when customers book.
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* DESKTOP TABLE */}
          <div className="hidden lg:block p-6">
            <div className="overflow-x-auto border rounded-2xl">
              <table className="w-full">
                <thead className="bg-gray-50 text-xs text-gray-600 uppercase">
                  <tr className="[&>th]:px-5 [&>th]:py-4 [&>th]:text-left">
                    <th>Customer</th>
                    <th>Service & Date</th>
                    <th>Documents</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {list.map((a) => {
                    const missingDocs =
                      !a.documentsSubmitted || !a.identityProvided || !a.passportProvided;

                    return (
                      <tr key={a._id} className="hover:bg-gray-50/80 transition">
                        {/* CUSTOMER */}
                        <td className="px-5 py-5">
                          <div className="flex items-start gap-3">
                            <div className="w-11 h-11 rounded-2xl bg-blue-50 border flex items-center justify-center">
                              <User className="w-5 h-5 text-blue-700" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 leading-tight">
                                {a.customerId?.fullName || "Unknown"}
                              </p>
                              <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                                <Phone className="w-4 h-4" />
                                {a.customerId?.phone || "No phone"}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* SERVICE */}
                        <td className="px-5 py-5">
                          <div className="flex flex-col gap-2">
                            <span className="inline-flex items-center w-fit px-3 py-1 rounded-full text-sm font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                              {a.serviceId?.name || "Unknown Service"}
                            </span>

                            <span className="text-sm text-gray-600 flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              {new Date(a.appointmentDate).toLocaleString()}
                            </span>
                          </div>
                        </td>

                        {/* DOCS */}
                        <td className="px-5 py-5">
                          {missingDocs ? (
                            <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
                              <div className="flex items-center gap-2 text-red-700 font-semibold mb-3">
                                <AlertTriangle className="w-4 h-4" />
                                Required Documents
                              </div>

                              <ul className="text-sm space-y-2 text-gray-700">
                                <li className="flex items-center gap-2">
                                  {a.identityProvided ? (
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                  ) : (
                                    <XCircle className="w-4 h-4 text-red-500" />
                                  )}
                                  <span>Identity Card</span>
                                </li>
                                <li className="flex items-center gap-2">
                                  {a.passportProvided ? (
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                  ) : (
                                    <XCircle className="w-4 h-4 text-red-500" />
                                  )}
                                  <span>Passport</span>
                                </li>
                              </ul>
                            </div>
                          ) : (
                            <div className="rounded-2xl border border-green-200 bg-green-50 p-4 flex items-center gap-2 text-green-700 font-semibold">
                              <CheckCircle className="w-5 h-5" />
                              All documents submitted
                            </div>
                          )}
                        </td>

                        {/* ACTIONS */}
                        <td className="px-5 py-5">
                          <div className="flex items-center justify-center gap-3">
                            <button
                              disabled={updatingId === a._id}
                              onClick={() => changeStatus(a._id, "APPROVED")}
                              className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-green-600 hover:bg-green-700 active:scale-[0.99] transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                            >
                              Approve
                            </button>

                            <button
                              disabled={updatingId === a._id}
                              onClick={() => changeStatus(a._id, "REJECTED")}
                              className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-red-600 hover:bg-red-700 active:scale-[0.99] transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                            >
                              Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* MOBILE / TABLET CARDS */}
          <div className="lg:hidden p-5 md:p-6 space-y-4">
            {list.map((a) => {
              const missingDocs =
                !a.documentsSubmitted || !a.identityProvided || !a.passportProvided;

              return (
                <div
                  key={a._id}
                  className="border rounded-2xl shadow-sm hover:shadow-md transition bg-white overflow-hidden"
                >
                  {/* Top */}
                  <div className="p-4 md:p-5 flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-blue-50 border flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-700" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {a.customerId?.fullName || "Unknown"}
                        </p>
                        <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                          <Phone className="w-4 h-4" />
                          {a.customerId?.phone || "No phone"}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                        missingDocs
                          ? "bg-red-50 text-red-700 border-red-200"
                          : "bg-green-50 text-green-700 border-green-200"
                      }`}
                    >
                      {missingDocs ? "Docs Missing" : "Docs OK"}
                    </span>
                  </div>

                  {/* Service */}
                  <div className="px-4 md:px-5 pb-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                        {a.serviceId?.name || "Unknown Service"}
                      </span>

                      <span className="text-sm text-gray-600 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {new Date(a.appointmentDate).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Docs */}
                  <div className="px-4 md:px-5 pb-5">
                    {missingDocs ? (
                      <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
                        <div className="flex items-center gap-2 text-red-700 font-semibold mb-3">
                          <AlertTriangle className="w-4 h-4" />
                          Required Documents
                        </div>

                        <ul className="text-sm space-y-2 text-gray-700">
                          <li className="flex items-center gap-2">
                            {a.identityProvided ? (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            ) : (
                              <XCircle className="w-4 h-4 text-red-500" />
                            )}
                            <span>Identity Card</span>
                          </li>
                          <li className="flex items-center gap-2">
                            {a.passportProvided ? (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            ) : (
                              <XCircle className="w-4 h-4 text-red-500" />
                            )}
                            <span>Passport</span>
                          </li>
                        </ul>
                      </div>
                    ) : (
                      <div className="rounded-2xl border border-green-200 bg-green-50 p-4 flex items-center gap-2 text-green-700 font-semibold">
                        <CheckCircle className="w-5 h-5" />
                        All documents submitted
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="p-4 md:p-5 border-t bg-gray-50 flex gap-3">
                    <button
                      disabled={updatingId === a._id}
                      onClick={() => changeStatus(a._id, "APPROVED")}
                      className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-green-600 hover:bg-green-700 active:scale-[0.99] transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                    >
                      Approve
                    </button>

                    <button
                      disabled={updatingId === a._id}
                      onClick={() => changeStatus(a._id, "REJECTED")}
                      className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-red-600 hover:bg-red-700 active:scale-[0.99] transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

