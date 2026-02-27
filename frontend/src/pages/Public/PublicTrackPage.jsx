
// import { useEffect, useMemo, useState } from "react";
// import {
//   Search,
//   Lock,
//   Info,
//   CheckCircle2,
//   AlertCircle,
//   Trash2,
// } from "lucide-react";
// import api from "../../utils/axios";

// const TRACKING_KEY = "appointify_tracking_id";

// export default function PublicTrackPage() {
//   const [appointmentId, setAppointmentId] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");
//   const [data, setData] = useState(null);
//   const [hasSaved, setHasSaved] = useState(false);

//   // ✅ Only detect if saved ID exists (DO NOT auto-fill)
//   useEffect(() => {
//     const saved = localStorage.getItem(TRACKING_KEY);
//     const cleanSaved = String(saved || "").trim();

//     if (cleanSaved && cleanSaved.length === 24) {
//       setHasSaved(true);
//     } else {
//       setHasSaved(false);
//     }
//   }, []);

//   const cleanId = appointmentId.trim();

//   const isValidObjectId = useMemo(
//     () => /^[a-fA-F0-9]{24}$/.test(cleanId),
//     [cleanId]
//   );

//   const isEmpty = cleanId.length === 0;

//   async function fetchStatus(id) {
//     const res = await api.get(`/public/appointments/${id}/status`);
//     return res.data;
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!isValidObjectId) {
//       setData(null);
//       setErrorMsg(
//         isEmpty
//           ? "Fadlan geli Appointment ID."
//           : "Appointment ID sax ma aha (24 characters)."
//       );
//       return;
//     }

//     setLoading(true);
//     setErrorMsg("");
//     setData(null);

//     try {
//       const res = await fetchStatus(cleanId);

//       if (res?.success) {
//         setData(res.data);
//       } else {
//         setErrorMsg(res?.message || "Appointment not found");
//       }
//     } catch (err) {
//       const msg =
//         err?.response?.data?.message ||
//         err?.response?.data?.error ||
//         "Appointment not found";
//       setErrorMsg(msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const useSavedId = () => {
//     const saved = localStorage.getItem(TRACKING_KEY);
//     const cleanSaved = String(saved || "").trim();

//     if (cleanSaved && cleanSaved.length === 24) {
//       setAppointmentId(cleanSaved);
//       setErrorMsg("");
//       setData(null);
//     }
//   };

//   const clearSavedId = () => {
//     localStorage.removeItem(TRACKING_KEY);
//     setHasSaved(false);
//   };

//   const prettyDate = (d) => {
//     try {
//       return d ? new Date(d).toDateString() : "—";
//     } catch {
//       return "—";
//     }
//   };

//   const statusLabel = (s) => {
//     const x = String(s || "").toLowerCase();
//     if (x === "approved") return "Approved";
//     if (x === "pending") return "Pending";
//     if (x === "completed") return "Completed";
//     return s || "—";
//   };

//   const statusClass = (s) => {
//     const x = String(s || "").toLowerCase();
//     if (x === "approved") return "statusPill approved";
//     if (x === "pending") return "statusPill pending";
//     if (x === "completed") return "statusPill completed";
//     return "statusPill";
//   };

//   return (
//     <section className="relative flex-1 w-full overflow-hidden flex items-center justify-center px-4 py-10">
//       <div className="absolute inset-0 pointer-events-none bg-slate-950/55" />

//       <div className="relative w-full max-w-5xl">
//         <div className="text-center mb-6">
//           <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white">
//             Track Your Appointment
//           </h1>
//           <p className="mt-2 text-slate-200/90 font-semibold">
//             Enter your Appointment ID to view your appointment status.
//           </p>
//         </div>

//         <div className="rounded-[30px] p-[1px] bg-gradient-to-r from-blue-500/35 via-white/10 to-blue-700/30 shadow-2xl shadow-black/35">
//           <div className="rounded-[29px] bg-white/5 backdrop-blur-2xl border border-white/10 p-5 md:p-6">
//             <form onSubmit={handleSubmit}>
//               <div className="flex flex-col md:flex-row gap-4 items-stretch">

//                 {/* INPUT */}
//                 <div className="relative flex-1">
//                   <div className="relative rounded-2xl p-[2px] bg-gradient-to-r from-blue-400/60 via-blue-600/70 to-indigo-400/50">
//                     <div className="flex items-center gap-3 rounded-[14px] bg-slate-950/55 border border-white/10 px-4 py-3">
//                       <Search className="text-white/85" size={18} />
//                       <input
//                         value={appointmentId}
//                         onChange={(e) => setAppointmentId(e.target.value)}
//                         placeholder="69943441d79e1429898caeea"
//                         className="w-full bg-transparent outline-none text-white placeholder:text-white/45 font-semibold"
//                         autoComplete="off"
//                       />
//                     </div>
//                   </div>

//                   <p className="mt-2 text-xs text-slate-200/80 flex items-center gap-2">
//                     <Info size={14} className="opacity-80" />
//                     Appointment ID waa 24-character (Fadlan Ilaasho).
//                   </p>

//                   {/* Saved ID Actions */}
//                   {hasSaved && (
//                     <div className="mt-3 flex gap-3 flex-wrap">
//                       <button
//                         type="button"
//                         onClick={useSavedId}
//                         className="px-4 py-2 rounded-xl text-xs font-black border border-white/10 bg-white/5 text-white hover:bg-white/10 transition"
//                       >
//                         Use Saved ID
//                       </button>

//                       <button
//                         type="button"
//                         onClick={clearSavedId}
//                         className="px-4 py-2 rounded-xl text-xs font-black border border-red-500/20 bg-red-500/10 text-red-200 hover:bg-red-500/20 transition"
//                       >
//                         <Trash2 size={14} className="inline mr-1" />
//                         Clear Saved
//                       </button>
//                     </div>
//                   )}
//                 </div>

//                 {/* BUTTON */}
//                 <div className="relative md:w-[260px] w-full">
//                   <button
//                     type="submit"
//                     disabled={!isValidObjectId || loading}
//                     className={`w-full px-5 py-3 rounded-2xl font-extrabold text-white transition ${
//                       isValidObjectId && !loading
//                         ? "bg-gradient-to-r from-blue-600 to-blue-800 hover:brightness-110"
//                         : "bg-slate-500 cursor-not-allowed"
//                     }`}
//                   >
//                     {loading ? "Tracking..." : "Track Status →"}
//                   </button>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>

//         {/* RESULT */}
//         <div className="mt-6">
//           {errorMsg && (
//             <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 flex items-center gap-3">
//               <AlertCircle className="text-red-300" size={20} />
//               <p className="font-bold text-red-100">{errorMsg}</p>
//             </div>
//           )}

//           {data && !errorMsg && (
//             <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
//               <div className="flex items-start gap-3">
//                 <CheckCircle2 className="text-blue-300" size={22} />
//                 <div className="space-y-2">
//                   <p className="font-black text-white">
//                     Adeeg:{" "}
//                     <span className="font-extrabold text-slate-200">
//                       {data?.service?.name || "—"}
//                     </span>
//                   </p>

//                   <p className="font-black text-white">
//                     Taariikh:{" "}
//                     <span className="font-extrabold text-slate-200">
//                       {prettyDate(data?.appointmentDate)}
//                     </span>
//                   </p>

//                   <p className="font-black text-white">
//                     Xaalad:{" "}
//                     <span className="font-extrabold text-slate-200">
//                       {statusLabel(data?.status)}
//                     </span>
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//       </div>
//     </section>
//   );
// }
import { useMemo, useState } from "react";
import {
  Search,
  AlertCircle,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";
import api from "../../utils/axios";

const PROCESS_STEPS = [
  { key: "PENDING", label: "Pending" },
  { key: "APPROVED", label: "Approved" },
  { key: "COMPLETED", label: "Completed" },
  { key: "NO_SHOW", label: "No Show" },
];

export default function PublicTrackPage() {
  const [appointmentId, setAppointmentId] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [data, setData] = useState(null);

  const cleanId = appointmentId.trim();

  const isValidObjectId = useMemo(() => {
    return /^[a-fA-F0-9]{24}$/.test(cleanId);
  }, [cleanId]);

  async function fetchStatus(id) {
    const res = await api.get(`/public/appointments/${id}/status`);
    return res.data;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidObjectId) {
      setErrorMsg("Please enter a valid 24-character Appointment ID.");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setData(null);

    try {
      const res = await fetchStatus(cleanId);
      if (res?.success) {
        setData(res.data);
      } else {
        setErrorMsg(res?.message || "Appointment not found.");
      }
    } catch (err) {
      setErrorMsg(
        err?.response?.data?.message || "Appointment not found."
      );
    } finally {
      setLoading(false);
    }
  };

  const currentIndex = PROCESS_STEPS.findIndex(
    (step) => step.key === data?.status
  );

  const progressWidth =
    currentIndex >= 0
      ? (currentIndex / (PROCESS_STEPS.length - 1)) * 100
      : 0;

  const prettyDate = (d) =>
    d ? new Date(d).toDateString() : "—";

  return (
    <section className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white">

      {/* FULL WIDTH CONTAINER */}
      <div className="w-full px-6 lg:px-16 xl:px-24 py-16">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-blue-700 leading-tight">
            Appointment Tracker
          </h1>
          <p className="text-gray-600 mt-4 text-lg sm:text-xl">
            Monitor your appointment progress across all stages.
          </p>
        </div>

        {/* SEARCH CARD */}
        <div className="max-w-5xl mx-auto bg-white shadow-2xl border border-blue-100 rounded-3xl p-6 sm:p-10 mb-16">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col lg:flex-row gap-6"
          >
            <div className="flex-1 flex items-center gap-4 bg-gray-50 px-6 py-4 rounded-2xl border border-gray-200 focus-within:border-blue-500 transition">
              <Search className="text-blue-600" size={22} />
              <input
                value={appointmentId}
                onChange={(e) => setAppointmentId(e.target.value)}
                placeholder="Enter Appointment ID"
                className="w-full bg-transparent outline-none text-gray-800 placeholder:text-gray-400 text-lg"
              />
            </div>

            <button
              type="submit"
              disabled={!isValidObjectId || loading}
              className={`px-10 py-4 rounded-2xl text-lg font-semibold text-white transition-all duration-300 ${
                isValidObjectId
                  ? "bg-blue-600 hover:bg-blue-700 hover:shadow-xl hover:scale-[1.02]"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {loading ? "Tracking..." : "Track Appointment"}
            </button>
          </form>
        </div>

        {/* ERROR */}
        {errorMsg && (
          <div className="max-w-5xl mx-auto bg-red-50 border border-red-200 p-6 rounded-2xl flex items-center gap-4 mb-10">
            <AlertCircle className="text-red-500" size={24} />
            <span className="text-red-600 font-medium text-lg">
              {errorMsg}
            </span>
          </div>
        )}

        {/* RESULT */}
        {data && !errorMsg && (
          <div className="max-w-6xl mx-auto bg-white shadow-2xl border border-blue-100 rounded-3xl p-10 lg:p-16">

            {/* INFO */}
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-blue-700 mb-4">
                {data?.service?.name}
              </h2>
              <p className="text-gray-600 text-xl">
                Appointment Date: {prettyDate(data?.appointmentDate)}
              </p>
              <p className="mt-4 text-2xl font-semibold text-gray-800">
                Current Status:{" "}
                <span className="text-blue-600">
                  {data?.status}
                </span>
              </p>
            </div>

            {/* HORIZONTAL TIMELINE */}
            <div className="relative mt-10">

              <div className="absolute top-7 left-0 right-0 h-2 bg-gray-200 rounded-full"></div>

              <div
                style={{ width: `${progressWidth}%` }}
                className="absolute top-7 left-0 h-2 bg-blue-600 rounded-full transition-all duration-500"
              ></div>

              <div className="relative flex justify-between items-center">
                {PROCESS_STEPS.map((step, index) => {
                  const isCompleted = index < currentIndex;
                  const isCurrent = index === currentIndex;

                  return (
                    <div key={step.key} className="flex flex-col items-center w-1/4">

                      <div
                        className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold transition-all ${
                          isCompleted
                            ? "bg-blue-600 text-white shadow-lg"
                            : isCurrent
                            ? "bg-white border-4 border-blue-600 text-blue-600"
                            : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 size={22} />
                        ) : isCurrent ? (
                          <Clock size={22} />
                        ) : (
                          index + 1
                        )}
                      </div>

                      <p
                        className={`mt-4 text-lg font-semibold ${
                          isCompleted || isCurrent
                            ? "text-blue-700"
                            : "text-gray-500"
                        }`}
                      >
                        {step.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}
      </div>
    </section>
  );
}
