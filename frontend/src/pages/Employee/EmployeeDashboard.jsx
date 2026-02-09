import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Activity,
  Layers,
  CheckCircle2,
  AlertCircle,
  Clock,
  CalendarDays,
  User,
  DownloadCloud,
} from "lucide-react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import {
  fetchEmployeeDashboardAnalytics,
  fetchMyApprovedAppointments,
} from "../../Redux/slices/cusomerSlice/appointmentEmployeeSlice";

const GENDER_COLORS = {
  MALE: "#6366f1",
  FEMALE: "#ec4899",
};

export default function EmployeeDashboard() {
  const dispatch = useDispatch();

  const {
    summary,
    byGender,
    byService,
    appointments,
    dashboardLoading,
    loadingAppointments,
  } = useSelector((state) => state.appointmentEmployee);

  const todayDate = new Date();
  const [month, setMonth] = useState(todayDate.getMonth() + 1);
  const [year, setYear] = useState(todayDate.getFullYear());

  useEffect(() => {
    dispatch(fetchEmployeeDashboardAnalytics({ month, year }));
    dispatch(fetchMyApprovedAppointments());
  }, [dispatch, month, year]);

  /* =========================
     TODAY APPOINTMENTS ONLY
  ========================= */
  const todayAppointments = useMemo(() => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    return appointments.filter((a) => {
      const d = new Date(a.appointmentDate);
      return d >= start && d <= end;
    });
  }, [appointments]);

  /* =========================
     GENDER PIE DATA
  ========================= */
  const genderData = useMemo(() => {
    return Object.entries(byGender || {})
      .filter(([_, value]) => value > 0)
      .map(([key, value]) => ({
        name: key,
        value,
      }));
  }, [byGender]);

  /* =========================
     PDF DOWNLOAD
  ========================= */
  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Employee Daily Appointment Report", 14, 15);

    doc.setFontSize(10);
    doc.text(
      `Date: ${new Date().toLocaleDateString()}`,
      14,
      22
    );

    doc.setFontSize(12);
    doc.text("Summary", 14, 32);

    autoTable(doc, {
      startY: 36,
      head: [["Metric", "Value"]],
      body: [
        ["Total Assigned", summary.totalAssigned],
        ["Completed", summary.completed],
        ["Pending", summary.approvedPending],
        ["No Show", summary.noShow],
      ],
      theme: "grid",
    });

    doc.text("Today's Appointments", 14, doc.lastAutoTable.finalY + 12);

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 16,
      head: [["Customer", "Gender", "Service", "Date"]],
      body: todayAppointments.map((a) => [
        a.customerId?.fullName || "N/A",
        a.customerId?.gender || "N/A",
        a.serviceId?.name || "N/A",
        new Date(a.appointmentDate).toLocaleDateString(),
      ]),
    });

    doc.save("employee_today_appointments.pdf");
  };

  if (dashboardLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#f8fafc]">
        <span className="text-slate-500 font-bold">
          Loading dashboard...
        </span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-10 bg-[#f8fafc] min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* ================= HEADER ================= */}
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-lg text-white">
              <Activity size={20} />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold">
                Employee Dashboard
              </h1>
              <p className="text-xs text-slate-500 font-bold">
                Personal performance & today activity
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <select
              value={month}
              onChange={(e) => setMonth(+e.target.value)}
              className="px-3 py-2 rounded-xl border bg-white text-sm font-bold"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i + 1}>
                  Month {i + 1}
                </option>
              ))}
            </select>

            <select
              value={year}
              onChange={(e) => setYear(+e.target.value)}
              className="px-3 py-2 rounded-xl border bg-white text-sm font-bold"
            >
              {[2024, 2025, 2026].map((y) => (
                <option key={y}>{y}</option>
              ))}
            </select>

            <button
              onClick={downloadPDF}
              className="px-4 py-2 bg-red-600 text-white rounded-xl flex items-center gap-2 text-sm font-bold hover:bg-red-700"
            >
              <DownloadCloud size={16} />
              PDF
            </button>
          </div>
        </div>

        {/* ================= KPI CARDS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <KPI icon={Layers} label="Total Assigned" value={summary.totalAssigned} />
          <KPI icon={CheckCircle2} label="Completed" value={summary.completed} />
          <KPI icon={Clock} label="Pending" value={summary.approvedPending} />
          <KPI icon={AlertCircle} label="No Show" value={summary.noShow} />
        </div>

        {/* ================= GENDER ANALYTICS ================= */}
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="font-black mb-4">Gender Distribution</h3>
          <div className="h-[260px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={genderData}
                  dataKey="value"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={6}
                >
                  {genderData.map((g) => (
                    <Cell
                      key={g.name}
                      fill={GENDER_COLORS[g.name] || "#94a3b8"}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ================= TODAY APPOINTMENTS ================= */}
        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
          <div className="p-6 border-b font-black">
            Today’s Appointments
          </div>

          {loadingAppointments ? (
            <p className="p-6 text-slate-500">Loading...</p>
          ) : todayAppointments.length === 0 ? (
            <p className="p-6 text-slate-500">
              No appointments for today
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="text-xs uppercase text-slate-400 font-black">
                  <tr>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Gender</th>
                    <th className="px-6 py-4">Service</th>
                    <th className="px-6 py-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {todayAppointments.map((a) => (
                    <tr key={a._id}>
                      <td className="px-6 py-4 font-bold">
                        {a.customerId?.fullName}
                      </td>
                      <td className="px-6 py-4">
                        {a.customerId?.gender}
                      </td>
                      <td className="px-6 py-4 italic text-slate-500">
                        {a.serviceId?.name}
                      </td>
                      <td className="px-6 py-4 flex items-center gap-2">
                        <CalendarDays size={14} />
                        {new Date(a.appointmentDate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ================= KPI COMPONENT ================= */
const KPI = ({ icon: Icon, label, value }) => (
  <div className="bg-white p-5 rounded-2xl border shadow-sm flex items-center gap-4">
    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
      <Icon size={24} />
    </div>
    <div>
      <p className="text-xs font-black text-slate-400 uppercase">
        {label}
      </p>
      <h4 className="text-2xl font-black">{value}</h4>
    </div>
  </div>
);
