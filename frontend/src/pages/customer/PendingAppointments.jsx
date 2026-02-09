import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ClipboardList,
  Phone,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  FileText,
  IdCard,
  BookOpen,
  UserCheck,
  UserPlus,
  Loader2,
  MoreVertical,
  AlertCircle,
} from "lucide-react";

import {
  fetchAppointments,
  updateAppointment,
  assignUserToAppointment,
} from "../../Redux/slices/cusomerSlice/appointmentSlice";
import { fetchUsers } from "../../Redux/slices/userSlices/userSlice";

export default function PendingAppointments() {
  const dispatch = useDispatch();
  const {
    list = [],
    loading,
    updatingId,
  } = useSelector((state) => state.appointments || {});
  const { list: users = [] } = useSelector((state) => state.users || {});
  const [selectedUser, setSelectedUser] = useState({});

  useEffect(() => {
    dispatch(fetchAppointments());
    dispatch(fetchUsers());
  }, [dispatch]);

  const pendingCount = useMemo(() => list.length, [list]);

  const approveWithUser = async (appointmentId) => {
    const userId = selectedUser[appointmentId];
    if (!userId) return; // Add a toast notification here if you have one

    await dispatch(
      assignUserToAppointment({ id: appointmentId, assignedUserId: userId }),
    );
    await dispatch(
      updateAppointment({ id: appointmentId, data: { status: "APPROVED" } }),
    );
    dispatch(fetchAppointments());
  };

  const rejectAppointment = async (id) => {
    await dispatch(updateAppointment({ id, data: { status: "REJECTED" } }));
    dispatch(fetchAppointments());
  };

  if (loading) return <LoadingSpinner />;
  if (pendingCount === 0) return <EmptyState />;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* COMPACT HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-100">
            <ClipboardList size={22} />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-800 tracking-tight">
              Pending Requests
            </h2>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Queue Management
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-xl">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
          </span>
          <span className="text-sm font-black text-blue-700">
            {pendingCount} Action Required
          </span>
        </div>
      </div>

      {/* APPOINTMENT LIST */}
      <div className="grid gap-4">
        {list.map((a) => {
          const isMissing =
            !a.documentsSubmitted || !a.identityProvided || !a.passportProvided;
          const isUpdating = updatingId === a._id;

          return (
            <div
              key={a._id}
              className="group relative bg-white border border-slate-100 rounded-[2rem] p-2 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-6 p-4">
                {/* CUSTOMER INFO */}
                <div className="flex-1 min-w-[200px]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold">
                      {a.customerId?.fullName?.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-black text-slate-800 text-sm leading-tight">
                        {a.customerId?.fullName || "Guest Client"}
                      </h4>
                      <p className="text-xs font-bold text-slate-400 flex items-center gap-1 mt-1">
                        <Phone size={12} className="text-blue-400" />{" "}
                        {a.customerId?.phone}
                      </p>
                    </div>
                  </div>
                </div>

                {/* SERVICE & DATE */}
                <div className="flex-1 border-l border-slate-50 pl-6">
                  <div className="inline-block px-2 py-1 rounded-md bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase mb-1">
                    {a.serviceId?.name}
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 font-bold text-xs">
                    <Calendar size={14} className="text-slate-300" />
                    {new Date(a.appointmentDate).toLocaleDateString()} at{" "}
                    {new Date(a.appointmentDate).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>

                {/* DOCUMENT BADGES */}
                <div className="flex-1 flex flex-wrap gap-2">
                  <DocBadge
                    icon={<FileText size={12} />}
                    ok={a.documentsSubmitted}
                  />
                  <DocBadge
                    icon={<IdCard size={12} />}
                    ok={a.identityProvided}
                  />
                  <DocBadge
                    icon={<BookOpen size={12} />}
                    ok={a.passportProvided}
                  />
                  {isMissing && (
                    <div className="flex items-center gap-1 text-[10px] font-black text-rose-500 uppercase ml-1">
                      <AlertCircle size={12} /> Needs Docs
                    </div>
                  )}
                </div>

                {/* ASSIGNMENT & ACTIONS */}
                <div className="flex flex-col sm:flex-row items-center gap-3 lg:w-[400px]">
                  <div className="relative w-full sm:w-48">
                    <UserPlus
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      size={14}
                    />
                    <select
                      className={`w-full pl-9 pr-4 py-2.5 rounded-xl text-xs font-bold appearance-none outline-none transition-all ${
                        selectedUser[a._id]
                          ? "bg-blue-50 border-blue-100 text-blue-700"
                          : "bg-slate-50 border-slate-100 text-slate-500"
                      }`}
                      value={selectedUser[a._id] || ""}
                      onChange={(e) =>
                        setSelectedUser((prev) => ({
                          ...prev,
                          [a._id]: e.target.value,
                        }))
                      }
                    >
                      <option value="">Assign Staff</option>
                      {users.map((u) => (
                        <option key={u._id} value={u._id}>
                          {u.fullName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => approveWithUser(a._id)}
                      disabled={isUpdating || !selectedUser[a._id]}
                      className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-slate-900 text-white text-[11px] font-black uppercase tracking-widest hover:bg-black disabled:opacity-30 transition-all flex items-center justify-center gap-2"
                    >
                      {isUpdating ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <CheckCircle size={14} />
                      )}
                      Approve
                    </button>
                    <button
                      onClick={() => rejectAppointment(a._id)}
                      disabled={isUpdating}
                      className="p-2.5 rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-100 transition-colors"
                    >
                      <XCircle size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* HELPER COMPONENTS */
function DocBadge({ icon, ok }) {
  return (
    <div
      className={`p-2 rounded-lg border transition-all ${
        ok
          ? "bg-emerald-50 border-emerald-100 text-emerald-600"
          : "bg-slate-50 border-slate-100 text-slate-300"
      }`}
    >
      {icon}
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="bg-white rounded-[2rem] border border-slate-100 p-20 text-center shadow-sm">
      <Loader2 className="w-10 h-10 text-blue-600 animate-spin mx-auto" />
      <h3 className="mt-4 font-black text-slate-800 text-lg">
        Synchronizing Queue
      </h3>
      <p className="text-slate-400 text-sm font-medium">
        Please wait while we fetch latest requests...
      </p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="bg-white rounded-[2rem] border border-dashed border-slate-200 p-20 text-center">
      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
        <UserCheck className="w-8 h-8 text-slate-300" />
      </div>
      <h3 className="font-black text-slate-800 text-lg italic">Inbox Zero</h3>
      <p className="text-slate-400 text-sm font-medium">
        All appointments have been successfully processed.
      </p>
    </div>
  );
}
