import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Users,
  UserPlus,
  Search,
  Phone,
  Mail,
  Calendar,
  Edit3,
  Trash2,
  Loader2,
  ChevronRight,
  TrendingUp,
  Filter,
} from "lucide-react";

import {
  fetchCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  searchCustomersWithStatus,
  clearCustomerSearch,
} from "../../Redux/slices/cusomerSlice/customerSlice";

import CustomerModal from "./CustomerModal";

export default function Customers() {
  const dispatch = useDispatch();
  const {
    list,
    loading,
    creating,
    updatingId,
    deletingId,
    searchResults,
    searching,
  } = useSelector((state) => state.customers);

  const [openModal, setOpenModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  useEffect(() => {
    if (search.trim().length >= 2) {
      dispatch(searchCustomersWithStatus(search));
    } else {
      dispatch(clearCustomerSearch());
    }
  }, [search, dispatch]);

  const handleSave = (data) => {
    if (selectedCustomer) {
      dispatch(updateCustomer({ id: selectedCustomer._id, data }));
    } else {
      dispatch(createCustomer(data));
    }
    setOpenModal(false);
    setSelectedCustomer(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      dispatch(deleteCustomer(id));
    }
  };

  const stats = useMemo(
    () => ({
      total: list.length,
      male: list.filter((c) => c.gender === "MALE").length,
      female: list.filter((c) => c.gender === "FEMALE").length,
    }),
    [list],
  );

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
          Syncing Customer Database...
        </p>
      </div>
    );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* HEADER */}
      <div className="bg-white border border-slate-200 rounded-[2rem] p-8 flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm">
        <div className="flex items-center gap-5">
          <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl shadow-inner">
            <Users size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">
              Customer Directory
            </h1>
            <p className="text-slate-500 text-sm font-medium">
              Manage records and audit client history
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setSelectedCustomer(null);
            setOpenModal(true);
          }}
          className="flex items-center gap-2 px-8 py-3.5 bg-blue-600 text-white rounded-xl font-bold shadow-xl shadow-slate-200 hover:bg-blue-700 hover:-translate-y-0.5 transition-all"
        >
          <UserPlus size={20} /> Register Customer
        </button>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <QuickStat
          label="Total Database"
          value={stats.total}
          trend="Total Records"
          color="blue"
        />
        <QuickStat
          label="Male Clients"
          value={stats.male}
          trend="Demographic"
          color="indigo"
        />
        <QuickStat
          label="Female Clients"
          value={stats.female}
          trend="Demographic"
          color="emerald"
        />
      </div>

      {/* MAIN CONTENT SPLIT */}
      <div className="grid lg:grid-cols-3 gap-8 items-start">
        {/* LEFT: CUSTOMER LIST (2/3) */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-[2.5rem] shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">
              Active Directory
            </h3>
            <div className="p-2 bg-white rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
              <Filter size={16} className="text-slate-500" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-50">
                  <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-tighter">
                    Client Identity
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-tighter">
                    Contact Info
                  </th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-tighter text-center">
                    Gender
                  </th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-tighter text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {list.map((c) => (
                  <tr
                    key={c._id}
                    className="group hover:bg-slate-50/80 transition-all"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center font-black group-hover:bg-blue-600 group-hover:text-white transition-all">
                          {c.fullName?.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-700 text-sm">
                            {c.fullName}
                          </p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                            ID: {c._id.slice(-6)}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                          <Phone size={12} className="text-slate-300" />{" "}
                          {c.phone}
                        </div>
                        <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                          <Mail size={12} className="text-slate-300" />{" "}
                          {c.email || "N/A"}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-tight ${
                          c.gender === "MALE"
                            ? "bg-blue-50 text-blue-600 border border-blue-100"
                            : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                        }`}
                      >
                        {c.gender}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => {
                            setSelectedCustomer(c);
                            setOpenModal(true);
                          }}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(c._id)}
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT: LOOKUP TOOL (1/3) */}
        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm sticky top-8">
          <div className="mb-6">
            <h2 className="text-lg font-black text-slate-800 tracking-tight">
              Quick Lookup
            </h2>
            <p className="text-xs font-medium text-slate-400">
              Check appointment status by client
            </p>
          </div>

          <div className="relative group mb-6">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors"
              size={18}
            />
            <input
              placeholder="Search name or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-blue-500 transition-all font-medium text-sm"
            />
          </div>

          <div className="space-y-4">
            {searching && (
              <div className="flex items-center gap-3 text-blue-600 font-bold text-xs animate-pulse">
                <Loader2 className="animate-spin" size={14} /> Fetching
                records...
              </div>
            )}

            {searchResults.map((r) => (
              <div
                key={r._id}
                className="p-4 rounded-2xl border border-slate-50 bg-slate-50/50 hover:bg-white hover:border-blue-100 hover:shadow-md transition-all cursor-default group"
              >
                <div className="flex justify-between items-start mb-2">
                  <p className="font-bold text-slate-700 text-sm">
                    {r.fullName}
                  </p>
                  <span className="text-[10px] font-black px-2 py-0.5 bg-white rounded-md border border-slate-100 text-blue-600">
                    {r.appointmentStatus}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                  <div className="flex items-center gap-1">
                    <Calendar size={12} />{" "}
                    {r.appointmentDate
                      ? new Date(r.appointmentDate).toLocaleDateString()
                      : "No Date"}
                  </div>
                  <ChevronRight
                    size={12}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                  <span className="text-slate-600">
                    {r.serviceName || "Standard"}
                  </span>
                </div>
              </div>
            ))}

            {search.length >= 2 && searchResults.length === 0 && !searching && (
              <p className="text-center py-8 text-xs font-bold text-slate-300 uppercase tracking-widest">
                No Matches Found
              </p>
            )}
          </div>
        </div>
      </div>

      <CustomerModal
        open={openModal}
        initialData={selectedCustomer}
        loading={creating || Boolean(updatingId)}
        onClose={() => {
          setOpenModal(false);
          setSelectedCustomer(null);
        }}
        onSubmit={handleSave}
      />
    </div>
  );
}

function QuickStat({ label, value, trend, color }) {
  const isBlue = color === "blue";
  const isIndigo = color === "indigo";
  return (
    <div className="bg-white border border-slate-200 p-6 rounded-[2rem] shadow-sm relative overflow-hidden group">
      <div
        className={`absolute top-0 right-0 p-4 transition-transform group-hover:scale-110 ${isBlue ? "text-blue-100" : isIndigo ? "text-indigo-100" : "text-emerald-100"}`}
      >
        <TrendingUp size={48} />
      </div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 relative z-10">
        {label}
      </p>
      <p className="text-3xl font-black text-slate-800 tracking-tighter relative z-10">
        {value}
      </p>
      <p className="text-[10px] font-bold text-slate-400 mt-2 relative z-10">
        {trend}
      </p>
    </div>
  );
}
