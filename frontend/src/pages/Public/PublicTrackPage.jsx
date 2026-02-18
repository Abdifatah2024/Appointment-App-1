import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { fetchAppointmentStatus } from "../../Redux/slices/PublicSlice/publicAppointmentSlice";

export default function PublicTrackPage() {
  const dispatch = useDispatch();
  const { appointmentStatus, statusLoading, error } = useSelector(
    (state) => state.publicAppointment
  );

  const [trackingId, setTrackingId] = useState("");

  return (
    <main className="relative w-full flex-1 overflow-hidden flex items-center">
      <div className="absolute inset-0 bg-white/35" />

      <div className="relative mx-auto max-w-4xl w-full px-4 md:px-8 py-10">
        <div className="rounded-[34px] bg-white/35 border border-white/55 backdrop-blur-2xl shadow-2xl shadow-slate-900/15 p-6 md:p-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">
              Track Your Appointment
            </h2>
            <p className="mt-2 text-slate-700 font-semibold">
              Enter your tracking ID to view your appointment status.
            </p>
          </div>

          <div className="mt-7 flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                size={18}
              />
              <input
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder="APP-2026-001"
                className="
                  w-full pl-11 pr-4 py-4 rounded-2xl
                  bg-white/60 border border-white/70
                  outline-none font-bold text-slate-800
                  focus:ring-4 focus:ring-emerald-400/20
                "
              />
            </div>

            <button
              onClick={() => dispatch(fetchAppointmentStatus(trackingId))}
              disabled={!trackingId || statusLoading}
              className="
                group relative inline-flex items-center justify-center gap-2
                px-7 py-4 rounded-2xl font-black text-white
                bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-600
                shadow-lg shadow-emerald-500/20
                transition-all duration-300
                hover:-translate-y-[1px] hover:brightness-110
                disabled:opacity-60 disabled:cursor-not-allowed
                overflow-hidden
              "
            >
              <span className="absolute -inset-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                bg-[radial-gradient(circle_at_25%_30%,rgba(255,255,255,0.35),transparent_60%)]" />
              {statusLoading ? (
                <Loader2 className="animate-spin relative" />
              ) : (
                <span className="relative">Track Status →</span>
              )}
            </button>
          </div>

          {appointmentStatus && (
            <div className="mt-7 rounded-2xl bg-white/60 border border-white/70 p-5">
              <div className="flex items-start gap-3">
                <CheckCircle className="text-emerald-600 mt-0.5" />
                <div className="text-slate-800 font-semibold space-y-1">
                  <p>
                    <b>Adeeg:</b> {appointmentStatus.service?.name}
                  </p>
                  <p>
                    <b>Taariikh:</b>{" "}
                    {new Date(appointmentStatus.appointmentDate).toDateString()}
                  </p>
                  <p>
                    <b>Xaalad:</b> {appointmentStatus.status}
                  </p>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-5 rounded-2xl bg-red-50/70 border border-red-200 p-4 flex gap-2">
              <AlertCircle className="text-red-600" />
              <p className="text-red-700 font-semibold">{error}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
