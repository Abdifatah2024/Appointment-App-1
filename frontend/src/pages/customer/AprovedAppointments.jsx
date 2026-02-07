import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAppointmentsByStatus,
  updateAppointment,
} from "../../Redux/slices/cusomerSlice/appointmentSlice";

import {
  User,
  Phone,
  Calendar,
  ClipboardList,
} from "lucide-react";

/* ❌ PENDING intentionally excluded */
const STATUS_OPTIONS = [
  { value: "APPROVED", label: "Approved" },
  { value: "COMPLETED", label: "Completed" },
  { value: "REJECTED", label: "Rejected" },
  { value: "CANCELLED", label: "Cancelled" },
  { value: "NO_SHOW", label: "No Show" },
];

export default function AppointmentsByStatus() {
  const dispatch = useDispatch();

  const { byStatus, loading, updatingId } = useSelector(
    (state) => state.appointments
  );

  /* ================================
     STATUS DROPDOWN STATE
     (NOT fixed to APPROVED)
  ================================ */
  const [status, setStatus] = useState("APPROVED"); // default can be changed

  /* ================================
     FETCH WHEN STATUS CHANGES
     Backend: /api/appointments?status=
  ================================ */
  useEffect(() => {
    if (status) {
      dispatch(fetchAppointmentsByStatus(status));
    }
  }, [status, dispatch]);

  const list = byStatus?.[status] || [];

  const count = useMemo(
    () => (Array.isArray(list) ? list.length : 0),
    [list]
  );

  const handleStatusChange = (id, newStatus) => {
    dispatch(updateAppointment({ id, data: { status: newStatus } })).then(() =>
      dispatch(fetchAppointmentsByStatus(status))
    );
  };

  /* =======================
     LOADING STATE
  ======================== */
  if (loading) {
    return (
      <div className="bg-white rounded-2xl border shadow-sm p-10">
        <div className="flex flex-col items-center justify-center gap-3 min-h-[260px]">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600 font-medium">
            Loading appointments...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
      {/* ================= HEADER ================= */}
      <div className="p-6 md:p-7 border-b bg-gradient-to-r from-blue-50 to-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center">
              <ClipboardList className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Appointments
              </h2>
              <p className="text-sm text-gray-500">
                View appointments by status
              </p>
            </div>
          </div>

          {/* STATUS DROPDOWN */}
          <div className="flex items-center gap-3">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border rounded-xl px-4 py-2 text-sm font-semibold bg-white"
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold">
              {count} Records
            </span>
          </div>
        </div>
      </div>

      {/* ================= EMPTY ================= */}
      {count === 0 ? (
        <div className="p-10 text-center text-gray-500">
          No appointments found for <b>{status}</b>
        </div>
      ) : (
        <div className="p-6 overflow-x-auto">
          <table className="w-full border rounded-2xl overflow-hidden">
            <thead className="bg-gray-50 text-xs text-gray-600 uppercase">
              <tr className="[&>th]:px-5 [&>th]:py-4 text-left">
                <th>Customer</th>
                <th>Service & Date</th>
                <th className="text-center">Update Status</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {list.map((a) => (
                <tr key={a._id} className="hover:bg-gray-50">
                  {/* CUSTOMER */}
                  <td className="px-5 py-5">
                    <div className="flex gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-blue-50 border flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-700" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {a.customerId?.fullName || "Unknown"}
                        </p>
                        <p className="text-sm text-gray-500 flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          {a.customerId?.phone || "No phone"}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* SERVICE */}
                  <td className="px-5 py-5">
                    <p className="inline-block mb-2 px-3 py-1 rounded-full text-sm font-semibold bg-indigo-50 text-indigo-700">
                      {a.serviceId?.name || "Unknown Service"}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(a.appointmentDate).toLocaleString()}
                    </p>
                  </td>

                  {/* UPDATE STATUS */}
                  <td className="px-5 py-5 text-center">
                    <select
                      disabled={updatingId === a._id}
                      value={a.status}
                      onChange={(e) =>
                        handleStatusChange(a._id, e.target.value)
                      }
                      className="border rounded-xl px-4 py-2 text-sm font-semibold bg-white disabled:opacity-50"
                    >
                      {STATUS_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
