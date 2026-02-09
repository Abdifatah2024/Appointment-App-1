import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Plus,
  Search,
  Wrench,
  Layers,
  Infinity as InfinityIcon,
  ShieldCheck,
  Edit3,
  Trash2,
  Loader2,
  FileText,
} from "lucide-react";

import {
  fetchServices,
  createService,
  updateService,
  deleteService,
} from "../../Redux/slices/cusomerSlice/serviceSlice";

import ServiceModal from "./ServiceModal";

export default function Services() {
  const dispatch = useDispatch();
  const { list, loading, creating, updatingId, deletingId } = useSelector(
    (state) => state.services,
  );

  const [openModal, setOpenModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const handleSave = (data) => {
    if (selectedService) {
      dispatch(updateService({ id: selectedService._id, data }));
    } else {
      dispatch(createService(data));
    }
    setOpenModal(false);
    setSelectedService(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      dispatch(deleteService(id));
    }
  };

  const filteredServices = useMemo(() => {
    return list.filter(
      (s) =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.code.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, list]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
        <p className="text-slate-400 font-bold">Loading Catalog...</p>
      </div>
    );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* HEADER */}
      <div className="bg-white border border-slate-200 rounded-[2rem] p-8 flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm">
        <div className="flex items-center gap-5">
          <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl shadow-sm border border-emerald-100">
            <Wrench size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">
              Service Catalog
            </h1>
            <p className="text-slate-500 text-sm font-medium leading-relaxed">
              Define and manage appointment-based offerings
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setSelectedService(null);
            setOpenModal(true);
          }}
          className="flex items-center gap-2 px-8 py-3.5 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 hover:-translate-y-0.5 transition-all"
        >
          <Plus size={20} /> Register New Service
        </button>
      </div>

      {/* INSIGHT CARDS */}
      <div className="grid md:grid-cols-3 gap-6">
        <StatCard
          label="Total Services"
          value={list.length}
          icon={<Layers size={20} />}
          color="blue"
        />
        <StatCard
          label="Limited Capacity"
          value={list.filter((s) => s.maxCustomersPerDay > 0).length}
          icon={<ShieldCheck size={20} />}
          color="emerald"
        />
        <StatCard
          label="High Demand / Unlimited"
          value={list.filter((s) => s.maxCustomersPerDay === 0).length}
          icon={<InfinityIcon size={20} />}
          color="blue"
        />
      </div>

      {/* TABLE SECTION */}
      <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-sm overflow-hidden">
        <div className="px-10 py-6 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <h3 className="text-lg font-black text-slate-800 tracking-tight">
            Active Offerings
          </h3>

          <div className="relative w-full md:w-80 group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors"
              size={18}
            />
            <input
              placeholder="Filter by name or code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-12 pr-4 py-2.5 text-sm outline-none focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-500/5 transition-all font-medium"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-10 py-5 text-[11px] font-black uppercase tracking-widest text-slate-400">
                  Service Branding
                </th>
                <th className="px-8 py-5 text-[11px] font-black uppercase tracking-widest text-slate-400">
                  Unique Code
                </th>
                <th className="px-8 py-5 text-[11px] font-black uppercase tracking-widest text-slate-400">
                  Required Docs
                </th>
                <th className="px-8 py-5 text-[11px] font-black uppercase tracking-widest text-slate-400 text-center">
                  Daily Cap
                </th>
                <th className="px-10 py-5 text-[11px] font-black uppercase tracking-widest text-right text-slate-400">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-50">
              {filteredServices.map((s) => (
                <tr
                  key={s._id}
                  className="group hover:bg-blue-50/30 transition-colors"
                >
                  <td className="px-10 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white border border-slate-100 text-emerald-500 rounded-xl flex items-center justify-center font-black shadow-sm group-hover:bg-emerald-500 group-hover:text-white transition-all">
                        {s.name?.charAt(0).toUpperCase()}
                      </div>
                      <p className="font-bold text-slate-700 tracking-tight">
                        {s.name}
                      </p>
                    </div>
                  </td>

                  <td className="px-8 py-5 font-mono text-xs text-blue-600 font-black">
                    {s.code}
                  </td>

                  <td className="px-8 py-5">
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        s.requiresIdentity && "Identity",
                        s.requiresPassport && "Passport",
                        s.requiresDocuments && "Files",
                      ]
                        .filter(Boolean)
                        .map((req, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 bg-white border border-slate-200 text-slate-500 rounded-lg text-[10px] font-black uppercase tracking-tight"
                          >
                            {req}
                          </span>
                        ))}
                      {!(
                        s.requiresIdentity ||
                        s.requiresPassport ||
                        s.requiresDocuments
                      ) && (
                        <span className="text-slate-300 text-[10px] font-bold italic">
                          Standard Access
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="px-8 py-5 text-center">
                    <div
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase ${
                        s.maxCustomersPerDay === 0
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                          : "bg-blue-50 text-blue-600 border border-blue-100"
                      }`}
                    >
                      {s.maxCustomersPerDay === 0 ? (
                        <InfinityIcon size={12} />
                      ) : null}
                      {s.maxCustomersPerDay === 0
                        ? "Unlimited"
                        : `${s.maxCustomersPerDay} / Day`}
                    </div>
                  </td>

                  <td className="px-10 py-5 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        disabled={updatingId === s._id}
                        onClick={() => {
                          setSelectedService(s);
                          setOpenModal(true);
                        }}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                      >
                        {updatingId === s._id ? (
                          <Loader2 className="animate-spin" size={16} />
                        ) : (
                          <Edit3 size={16} />
                        )}
                      </button>

                      <button
                        disabled={deletingId === s._id}
                        onClick={() => handleDelete(s._id)}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                      >
                        {deletingId === s._id ? (
                          <Loader2 className="animate-spin" size={16} />
                        ) : (
                          <Trash2 size={16} />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      <ServiceModal
        open={openModal}
        initialData={selectedService}
        loading={creating || Boolean(updatingId)}
        onClose={() => {
          setOpenModal(false);
          setSelectedService(null);
        }}
        onSubmit={handleSave}
      />
    </div>
  );
}

/* HELPER COMPONENTS */
function StatCard({ label, value, icon, color }) {
  const isBlue = color === "blue";
  return (
    <div className="bg-white border border-slate-100 p-6 rounded-[2rem] shadow-sm flex items-center justify-between">
      <div>
        <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">
          {label}
        </p>
        <p className="text-3xl font-black text-slate-800 tracking-tighter">
          {value}
        </p>
      </div>
      <div
        className={`p-4 rounded-2xl ${isBlue ? "bg-blue-50 text-blue-600" : "bg-emerald-50 text-emerald-600"}`}
      >
        {icon}
      </div>
    </div>
  );
}
