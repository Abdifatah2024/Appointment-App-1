import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEmployeeDashboardAnalytics,
  fetchMyApprovedAppointments,
} from "../../Redux/slices/cusomerSlice/appointmentEmployeeSlice";

const EmployeeDashboard = () => {
  const dispatch = useDispatch();

  const {
    summary,
    byGender,
    byService,
    dashboardLoading,
    appointments,
    loadingAppointments,
  } = useSelector((state) => state.appointmentEmployee);

  const today = new Date();
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [year, setYear] = useState(today.getFullYear());

  useEffect(() => {
    dispatch(fetchEmployeeDashboardAnalytics({ month, year }));
    dispatch(fetchMyApprovedAppointments());
  }, [dispatch, month, year]);

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">
          Employee Dashboard
        </h1>

        <div className="flex gap-2">
          <select
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            className="border rounded px-3 py-1"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i + 1}>
                Month {i + 1}
              </option>
            ))}
          </select>

          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="border rounded px-3 py-1"
          >
            {[2024, 2025, 2026].map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* KPI CARDS */}
      {dashboardLoading ? (
        <p>Loading dashboard...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard title="Total Assigned" value={summary.totalAssigned} />
          <StatCard title="Completed" value={summary.completed} />
          <StatCard title="Pending" value={summary.approvedPending} />
          <StatCard title="No Show" value={summary.noShow} />
        </div>
      )}

      {/* BREAKDOWN */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* BY GENDER */}
        <div className="bg-white shadow rounded p-4">
          <h3 className="font-semibold mb-3">By Gender</h3>
          <p>Male: {byGender.MALE}</p>
          <p>Female: {byGender.FEMALE}</p>
        </div>

        {/* BY SERVICE */}
        <div className="bg-white shadow rounded p-4">
          <h3 className="font-semibold mb-3">By Service</h3>
          {Object.keys(byService).length === 0 ? (
            <p>No data</p>
          ) : (
            <ul className="space-y-1">
              {Object.entries(byService).map(([name, count]) => (
                <li key={name} className="flex justify-between">
                  <span>{name}</span>
                  <span className="font-medium">{count}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* ASSIGNED APPOINTMENTS */}
      <div className="bg-white shadow rounded p-4">
        <h3 className="font-semibold mb-3">
          My Approved Appointments
        </h3>

        {loadingAppointments ? (
          <p>Loading appointments...</p>
        ) : appointments.length === 0 ? (
          <p>No approved appointments</p>
        ) : (
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Customer</th>
                <th className="p-2 border">Phone</th>
                <th className="p-2 border">Gender</th>
                <th className="p-2 border">Service</th>
                <th className="p-2 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((a) => (
                <tr key={a._id} className="text-center">
                  <td className="p-2 border">
                    {a.customerId?.fullName}
                  </td>
                  <td className="p-2 border">
                    {a.customerId?.phone}
                  </td>
                  <td className="p-2 border">
                    {a.customerId?.gender}
                  </td>
                  <td className="p-2 border">
                    {a.serviceId?.name}
                  </td>
                  <td className="p-2 border">
                    {new Date(a.appointmentDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

/* =========================
   STAT CARD
========================= */
const StatCard = ({ title, value }) => (
  <div className="bg-white shadow rounded p-4 text-center">
    <p className="text-gray-500 text-sm">{title}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default EmployeeDashboard;
