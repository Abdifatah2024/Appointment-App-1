// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchServices,
//   createService,
//   updateService,
//   deleteService,
// } from "../../Redux/slices/cusomerSlice/serviceSlice";
// import ServiceModal from "./ServiceModal";

// export default function Services() {
//   const dispatch = useDispatch();
//   const {
//     list,
//     loading,
//     creating,
//     updatingId,
//     deletingId,
//   } = useSelector((state) => state.services);

//   const [openModal, setOpenModal] = useState(false);
//   const [selectedService, setSelectedService] = useState(null);

//   useEffect(() => {
//     dispatch(fetchServices());
//   }, [dispatch]);

//   const handleSave = (data) => {
//     if (selectedService) {
//       dispatch(updateService({ id: selectedService._id, data }));
//     } else {
//       dispatch(createService(data));
//     }
//     setOpenModal(false);
//     setSelectedService(null);
//   };

//   const handleDelete = (id) => {
//     if (window.confirm("Delete this service?")) {
//       dispatch(deleteService(id));
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-xl font-semibold">Services</h1>
//         <button
//           onClick={() => {
//             setSelectedService(null);
//             setOpenModal(true);
//           }}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg"
//         >
//           + Register Service
//         </button>
//       </div>

//       {loading ? (
//         <p>Loading services...</p>
//       ) : (
//         <table className="w-full bg-white rounded-lg shadow">
//           <thead>
//             <tr className="border-b">
//               <th className="p-3 text-left">Name</th>
//               <th className="p-3 text-left">Code</th>
//               <th className="p-3 text-left">Requirements</th>
//               <th className="p-3 text-left">Daily Limit</th>
//               <th className="p-3 text-right">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {list.map((s) => (
//               <tr key={s._id} className="border-b">
//                 <td className="p-3">{s.name}</td>
//                 <td className="p-3">{s.code}</td>
//                 <td className="p-3 text-sm">
//                   {s.requiresIdentity && "ID "}
//                   {s.requiresPassport && "Passport "}
//                   {s.requiresDocuments && "Docs "}
//                 </td>
//                 <td className="p-3">
//                   {s.maxCustomersPerDay === 0 ? "Unlimited" : s.maxCustomersPerDay}
//                 </td>
//                 <td className="p-3 text-right space-x-3">
//                   <button
//                     onClick={() => {
//                       setSelectedService(s);
//                       setOpenModal(true);
//                     }}
//                     className="text-blue-600"
//                   >
//                     {updatingId === s._id ? "Updating..." : "Edit"}
//                   </button>
//                   <button
//                     onClick={() => handleDelete(s._id)}
//                     className="text-red-600"
//                   >
//                     {deletingId === s._id ? "Deleting..." : "Delete"}
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       <ServiceModal
//         open={openModal}
//         initialData={selectedService}
//         loading={creating || !!updatingId}
//         onClose={() => {
//           setOpenModal(false);
//           setSelectedService(null);
//         }}
//         onSubmit={handleSave}
//       />
//     </div>
//   );
// }

import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

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
    (state) => state.services
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
        s.code.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, list]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-slate-900"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">

      {/* HEADER */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900">
            Services
          </h1>
          <p className="text-slate-500">
            Manage all appointment services offered by the system
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedService(null);
            setOpenModal(true);
          }}
          className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:scale-[1.02] transition-all"
        >
          + Register Service
        </button>
      </div>

      {/* STAT CARDS */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white border rounded-xl p-4">
          <p className="text-sm text-slate-400">Total Services</p>
          <p className="text-2xl font-bold">{list.length}</p>
        </div>

        <div className="bg-white border rounded-xl p-4">
          <p className="text-sm text-slate-400">Limited Services</p>
          <p className="text-2xl font-bold">
            {list.filter((s) => s.maxCustomersPerDay > 0).length}
          </p>
        </div>

        <div className="bg-white border rounded-xl p-4">
          <p className="text-sm text-slate-400">Unlimited Services</p>
          <p className="text-2xl font-bold">
            {list.filter((s) => s.maxCustomersPerDay === 0).length}
          </p>
        </div>
      </div>

      {/* SERVICES TABLE */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

        <div className="px-6 py-4 border-b border-slate-100 flex flex-col md:flex-row justify-between gap-4">
          <h3 className="text-xl font-bold text-slate-900">
            Service List
          </h3>

          <input
            placeholder="Search by name or code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-100 w-full md:w-64"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">
                  Service Name
                </th>

                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">
                  Code
                </th>

                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">
                  Requirements
                </th>

                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase text-center">
                  Daily Limit
                </th>

                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-50">
              {filteredServices.map((s) => (
                <tr
                  key={s._id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center font-bold">
                        {s.name?.charAt(0).toUpperCase()}
                      </div>

                      <p className="font-semibold text-slate-900">
                        {s.name}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-700">
                    {s.code}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {[
                      s.requiresIdentity && "ID",
                      s.requiresPassport && "Passport",
                      s.requiresDocuments && "Documents",
                    ]
                      .filter(Boolean)
                      .map((req, i) => (
                        <span
                          key={i}
                          className="inline-block mr-2 mb-1 px-2 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold"
                        >
                          {req}
                        </span>
                      ))}

                    {!s.requiresIdentity &&
                      !s.requiresPassport &&
                      !s.requiresDocuments && (
                        <span className="text-slate-400 italic">
                          None
                        </span>
                      )}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        s.maxCustomersPerDay === 0
                          ? "bg-green-50 text-green-700"
                          : "bg-blue-50 text-blue-700"
                      }`}
                    >
                      {s.maxCustomersPerDay === 0
                        ? "Unlimited"
                        : s.maxCustomersPerDay}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        disabled={updatingId === s._id}
                        onClick={() => {
                          setSelectedService(s);
                          setOpenModal(true);
                        }}
                        className="px-3 py-1.5 text-sm bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 font-semibold disabled:opacity-60"
                      >
                        {updatingId === s._id ? "Updating..." : "Edit"}
                      </button>

                      <button
                        disabled={deletingId === s._id}
                        onClick={() => handleDelete(s._id)}
                        className="px-3 py-1.5 text-sm bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 font-semibold disabled:opacity-60"
                      >
                        {deletingId === s._id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredServices.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="p-6 text-center text-slate-500"
                  >
                    No services found
                  </td>
                </tr>
              )}
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
