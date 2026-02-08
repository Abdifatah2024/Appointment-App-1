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


