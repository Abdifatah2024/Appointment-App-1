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

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

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
    return Object.entries(byGender || {})
      .filter(([_, value]) => value > 0)
      .map(([key, value]) => ({
        name: key,
        value,
      }));
  }, [byGender]);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Employee Daily Appointment Report", 14, 15);
    doc.setFontSize(10);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 22);

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

    doc.save("employee_report.pdf");
  };

  if (dashboardLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-slate-500 font-black text-xs uppercase tracking-widest">
            Loading...
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
            <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-200">
              <Activity size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-800 tracking-tight">
                Employee <span className="text-blue-600">Insights</span>
              </h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
                Activity Overview
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={month}
              onChange={(e) => setMonth(+e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-black uppercase outline-none shadow-sm"
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
              className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-black uppercase outline-none shadow-sm"
            >
              {[2024, 2025, 2026].map((y) => (
                <option key={y}>{y}</option>
              ))}
            </select>
            <button
              onClick={downloadPDF}
              className="px-5 py-2.5 bg-white text-rose-600 rounded-xl flex items-center gap-2 text-xs font-black uppercase shadow-lg shadow-rose-70 hover:bg-rose-50"
            >
              <DownloadCloud size={18} /> PDF
            </button>
          </div>
        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPI
            icon={Layers}
            label="Total Assigned"
            value={summary.totalAssigned}
            color="text-blue-600"
            bgColor="bg-blue-50"
          />
          <KPI
            icon={CheckCircle2}
            label="Completed"
            value={summary.completed}
            color="text-emerald-600"
            bgColor="bg-emerald-50"
          />
          <KPI
            icon={Clock}
            label="Pending"
            value={summary.approvedPending}
            color="text-amber-600"
            bgColor="bg-amber-50"
          />
          <KPI
            icon={AlertCircle}
            label="No Show"
            value={summary.noShow}
            color="text-rose-600"
            bgColor="bg-rose-50"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* GENDER ANALYTICS WITH PERCENTAGES */}
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col items-center">
            <div className="w-full mb-6 text-left">
              <h3 className="font-black text-slate-800 tracking-tight">
                Gender Distribution
              </h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                Demographics share
              </p>
            </div>
            <div className="h-[280px] w-full">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={genderData}
                    dataKey="value"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={8}
                    stroke="none"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    labelLine={false}
                  >
                    {genderData.map((g) => (
                      <Cell
                        key={g.name}
                        fill={GENDER_COLORS[g.name] || "#94a3b8"}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: "15px",
                      border: "none",
                      boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* TODAY APPOINTMENTS */}
          <div className="lg:col-span-2 bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center">
              <div>
                <h3 className="font-black text-slate-800 tracking-tight">
                  Today’s Schedule
                </h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                  Real-time queue
                </p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[10px] uppercase text-slate-400 font-black tracking-widest border-b border-slate-50">
                    <th className="px-8 py-5">Customer</th>
                    <th className="px-8 py-5">Service</th>
                    <th className="px-8 py-5 text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {todayAppointments.map((a) => (
                    <tr
                      key={a._id}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white text-xs font-black">
                            {a.customerId?.fullName?.charAt(0)}
                          </div>
                          <span className="font-bold text-slate-700">
                            {a.customerId?.fullName}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-5 italic text-slate-500 text-sm">
                        {a.serviceId?.name}
                      </td>
                      <td className="px-8 py-5 text-right text-xs font-bold text-slate-400">
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

const KPI = ({ icon: Icon, label, value, color, bgColor }) => (
  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5">
    <div className={`p-4 ${bgColor} ${color} rounded-2xl`}>
      <Icon size={24} />
    </div>
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
        {label}
      </p>
      <h4 className="text-3xl font-black text-slate-800 tracking-tighter">
        {value}
      </h4>
    </div>
  </div>
);
