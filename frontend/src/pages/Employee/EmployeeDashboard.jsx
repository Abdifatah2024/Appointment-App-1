import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Activity,
  Layers,
  CheckCircle2,
  AlertCircle,
  Clock,
  CalendarDays,
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
    summary = {},
    byGender = {},
    appointments = [],
    dashboardLoading,
    loadingAppointments,
  } = useSelector((state) => state.appointmentEmployee);

  const today = new Date();
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [year, setYear] = useState(today.getFullYear());

  useEffect(() => {
    dispatch(fetchEmployeeDashboardAnalytics({ month, year }));
    dispatch(fetchMyApprovedAppointments());
  }, [dispatch, month, year]);

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

  const genderData = useMemo(() => {
    return Object.entries(byGender)
      .filter(([_, v]) => v > 0)
      .map(([k, v]) => ({ name: k, value: v }));
  }, [byGender]);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Employee Daily Appointment Report", 14, 15);
    doc.setFontSize(10);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 22);

    autoTable(doc, {
      startY: 30,
      head: [["Metric", "Value"]],
      body: [
        ["Total Assigned", summary.totalAssigned || 0],
        ["Completed", summary.completed || 0],
        ["Pending", summary.approvedPending || 0],
        ["No Show", summary.noShow || 0],
      ],
    });

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 12,
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
      <div className="h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-slate-500 font-black text-xs uppercase">
            Loading dashboard…
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-10 bg-[#F8FAFC] min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* HEADER */}
        <div className="flex flex-wrap justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600 rounded-2xl text-white shadow">
              <Activity size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-800">
                Employee Dashboard
              </h1>
              <p className="text-xs text-slate-400 font-bold">
                Personal performance & today activity
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <select className="px-4 py-2 border border-slate-200 rounded-xl bg-white text-xs font-bold shadow-sm">
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i + 1}>
                  Month {i + 1}
                </option>
              ))}
            </select>

            <select className="px-4 py-2 border border-slate-200 rounded-xl bg-white text-xs font-bold shadow-sm">
              {[2024, 2025, 2026].map((y) => (
                <option key={y}>{y}</option>
              ))}
            </select>

            <button
              onClick={downloadPDF}
              className="px-4 py-2.5 bg-white border border-slate-200 text-red-600 rounded-xl flex items-center gap-2 text-sm font-bold shadow-sm"
            >
              <DownloadCloud size={16} /> PDF
            </button>
          </div>
        </div>

        {/* KPI */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPI
            icon={Layers}
            label="Total Assigned"
            value={summary.totalAssigned}
            color="bg-indigo-50 text-indigo-600"
          />
          <KPI
            icon={CheckCircle2}
            label="Completed"
            value={summary.completed}
            color="bg-emerald-50 text-emerald-600"
          />
          <KPI
            icon={Clock}
            label="Pending"
            value={summary.approvedPending}
            color="bg-amber-50 text-amber-600"
          />
          <KPI
            icon={AlertCircle}
            label="No Show"
            value={summary.noShow}
            color="bg-rose-50 text-rose-600"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* GENDER PIE */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-black mb-4">Gender Distribution</h3>
            <div className="h-[260px]">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={genderData}
                    dataKey="value"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={8}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    labelLine={false}
                  >
                    {genderData.map((g) => (
                      <Cell key={g.name} fill={GENDER_COLORS[g.name]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* TODAY TABLE */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-200 font-black">
              Today’s Appointments
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="text-xs uppercase text-slate-400 font-black border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Service</th>
                    <th className="px-6 py-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {todayAppointments.map((a) => (
                    <tr key={a._id}>
                      <td className="px-6 py-4 font-bold">
                        {a.customerId?.fullName}
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

          </div>
        </div>
      </div>
    </div>
  );
}

/* KPI */
const KPI = ({ icon: Icon, label, value, color }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-5">
    <div className={`p-4 rounded-xl ${color}`}>
      <Icon size={24} />
    </div>
    <div>
      <p className="text-xs font-black text-slate-400 uppercase">{label}</p>
      <h4 className="text-3xl font-black text-slate-800">{value || 0}</h4>
    </div>
  </div>
);
