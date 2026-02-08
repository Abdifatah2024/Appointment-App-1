// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import {
//   fetchCustomers,
//   createCustomer,
//   updateCustomer,
//   deleteCustomer,
//   searchCustomersWithStatus,
//   clearCustomerSearch,
// } from "../../Redux/slices/cusomerSlice/customerSlice";

// import CustomerModal from "./CustomerModal";

// export default function Customers() {
//   const dispatch = useDispatch();

//   const {
//     list,
//     loading,
//     creating,
//     updatingId,
//     deletingId,
//     searchResults,
//     searching,
//   } = useSelector((state) => state.customers);

//   const [openModal, setOpenModal] = useState(false);
//   const [selectedCustomer, setSelectedCustomer] = useState(null);
//   const [search, setSearch] = useState("");

//   /* ================================
//      FETCH CUSTOMERS ON LOAD
//   ================================ */
//   useEffect(() => {
//     dispatch(fetchCustomers());
//   }, [dispatch]);

//   /* ================================
//      SEARCH CUSTOMER STATUS
//   ================================ */
//   useEffect(() => {
//     if (search.trim().length >= 2) {
//       dispatch(searchCustomersWithStatus(search));
//     } else {
//       dispatch(clearCustomerSearch());
//     }
//   }, [search, dispatch]);

//   /* ================================
//      CREATE / UPDATE
//   ================================ */
//   const handleSave = (data) => {
//     if (selectedCustomer) {
//       dispatch(updateCustomer({ id: selectedCustomer._id, data }));
//     } else {
//       dispatch(createCustomer(data));
//     }

//     setOpenModal(false);
//     setSelectedCustomer(null);
//   };

//   /* ================================
//      DELETE
//   ================================ */
//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this customer?")) {
//       dispatch(deleteCustomer(id));
//     }
//   };

//   return (
//     <div className="space-y-10">
//       {/* =================================================
//           SECTION 1: REGISTER / MANAGE CUSTOMERS
//       ================================================= */}
//       <div className="space-y-6">
//         <div className="flex justify-between items-center">
//           <h1 className="text-xl font-semibold">Customers</h1>

//           <button
//             onClick={() => {
//               setSelectedCustomer(null);
//               setOpenModal(true);
//             }}
//             className="bg-blue-600 text-white px-4 py-2 rounded-lg"
//           >
//             + Register Customer
//           </button>
//         </div>

//         {loading ? (
//           <p className="text-gray-500">Loading customers...</p>
//         ) : (
//           <div className="overflow-x-auto bg-white rounded-lg shadow">
//             <table className="w-full">
//               <thead className="bg-gray-100">
//                 <tr className="border-b text-sm text-gray-600">
//                   <th className="p-3 text-left">Full Name</th>
//                   <th className="p-3 text-left">Phone</th>
//                   <th className="p-3 text-left">Email</th>
//                   <th className="p-3 text-right">Actions</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {list.length === 0 ? (
//                   <tr>
//                     <td
//                       colSpan="4"
//                       className="p-4 text-center text-gray-500"
//                     >
//                       No customers found
//                     </td>
//                   </tr>
//                 ) : (
//                   list.map((c) => (
//                     <tr key={c._id} className="border-b hover:bg-gray-50">
//                       <td className="p-3">{c.fullName}</td>
//                       <td className="p-3">{c.phone}</td>
//                       <td className="p-3">{c.email || "-"}</td>
//                       <td className="p-3 text-right space-x-4">
//                         <button
//                           onClick={() => {
//                             setSelectedCustomer(c);
//                             setOpenModal(true);
//                           }}
//                           className="text-blue-600 hover:underline"
//                         >
//                           {updatingId === c._id ? "Updating..." : "Edit"}
//                         </button>

//                         <button
//                           onClick={() => handleDelete(c._id)}
//                           className="text-red-600 hover:underline"
//                         >
//                           {deletingId === c._id ? "Deleting..." : "Delete"}
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {/* =================================================
//           SECTION 2: SEARCH & VIEW APPOINTMENT STATUS
//       ================================================= */}
//       <div className="bg-white rounded-lg shadow p-6 space-y-4">
//         <h2 className="text-lg font-semibold">
//           Search Customer Appointment Status
//         </h2>

//         <input
//           type="text"
//           placeholder="Search by name or phone..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full border rounded-lg px-4 py-2"
//         />

//         {searching && (
//           <p className="text-sm text-gray-500">Searching...</p>
//         )}

//         {!searching && searchResults.length === 0 && search.length >= 2 && (
//           <p className="text-sm text-gray-500">
//             No appointment records found
//           </p>
//         )}

//         {searchResults.length > 0 && (
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm border rounded-lg">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="p-3 text-left">Name</th>
//                   <th className="p-3 text-left">Phone</th>
//                   <th className="p-3 text-left">Service</th>
//                   <th className="p-3 text-left">Date</th>
//                   <th className="p-3 text-left">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {searchResults.map((r) => (
//                   <tr key={r._id} className="border-b">
//                     <td className="p-3">{r.fullName}</td>
//                     <td className="p-3">{r.phone}</td>
//                     <td className="p-3">{r.serviceName || "-"}</td>
//                     <td className="p-3">
//                       {r.appointmentDate
//                         ? new Date(r.appointmentDate).toLocaleDateString()
//                         : "-"}
//                     </td>
//                     <td className="p-3">
//                       <span
//                         className={`px-3 py-1 rounded-full text-xs font-semibold
//                           ${
//                             r.appointmentStatus === "PENDING"
//                               ? "bg-yellow-100 text-yellow-800"
//                               : r.appointmentStatus === "APPROVED"
//                               ? "bg-blue-100 text-blue-800"
//                               : r.appointmentStatus === "COMPLETED"
//                               ? "bg-green-100 text-green-800"
//                               : r.appointmentStatus === "REJECTED"
//                               ? "bg-red-100 text-red-800"
//                               : "bg-gray-100 text-gray-600"
//                           }`}
//                       >
//                         {r.appointmentStatus}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {/* =================================================
//           CUSTOMER MODAL
//       ================================================= */}
//       <CustomerModal
//         open={openModal}
//         initialData={selectedCustomer}
//         loading={creating || Boolean(updatingId)}
//         onClose={() => {
//           setOpenModal(false);
//           setSelectedCustomer(null);
//         }}
//         onSubmit={handleSave}
//       />
//     </div>
//   );
// }
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

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

  const stats = useMemo(() => {
    return {
      total: list.length,
      male: list.filter((c) => c.gender === "MALE").length,
      female: list.filter((c) => c.gender === "FEMALE").length,
    };
  }, [list]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Customers</h1>
          <p className="text-slate-500">
            Register, manage and track customer appointments
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedCustomer(null);
            setOpenModal(true);
          }}
          className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:scale-[1.02] transition-all"
        >
          + Register Customer
        </button>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white border rounded-xl p-4">
          <p className="text-sm text-slate-400">Total Customers</p>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>

        <div className="bg-white border rounded-xl p-4">
          <p className="text-sm text-slate-400">Male</p>
          <p className="text-2xl font-bold">{stats.male}</p>
        </div>

        <div className="bg-white border rounded-xl p-4">
          <p className="text-sm text-slate-400">Female</p>
          <p className="text-2xl font-bold">{stats.female}</p>
        </div>
      </div>

      {/* CUSTOMER TABLE */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-xl font-bold text-slate-900">Customer List</h3>

          <input
            placeholder="Search customers..."
            className="border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">
                  Customer
                </th>

                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">
                  Phone
                </th>

                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">
                  Email
                </th>

                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase text-center">
                  Gender
                </th>

                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-50">
              {list.map((c) => (
                <tr key={c._id} className="hover:bg-slate-50 transition-colors">
                  {/* NAME COLUMN */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-bold">
                        {c.fullName?.charAt(0).toUpperCase()}
                      </div>

                      <p className="font-semibold text-slate-900">
                        {c.fullName}
                      </p>
                    </div>
                  </td>

                  {/* PHONE COLUMN */}
                  <td className="px-6 py-4 text-sm text-slate-700">
                    {c.phone}
                  </td>

                  {/* EMAIL COLUMN */}
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {c.email || (
                      <span className="text-slate-400 italic">No email</span>
                    )}
                  </td>

                  {/* GENDER COLUMN */}
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        c.gender === "MALE"
                          ? "bg-blue-50 text-blue-700"
                          : "bg-pink-50 text-pink-700"
                      }`}
                    >
                      {c.gender}
                    </span>
                  </td>

                  {/* ACTIONS COLUMN */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setSelectedCustomer(c);
                          setOpenModal(true);
                        }}
                        className="px-3 py-1.5 text-sm bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 font-semibold"
                      >
                        {updatingId === c._id ? "Updating..." : "Edit"}
                      </button>

                      <button
                        onClick={() => handleDelete(c._id)}
                        className="px-3 py-1.5 text-sm bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 font-semibold"
                      >
                        {deletingId === c._id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {list.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-slate-500">
                    No customers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* SEARCH APPOINTMENTS */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
        <h2 className="text-xl font-bold">Appointment Lookup</h2>

        <input
          type="text"
          placeholder="Search by name or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-100"
        />

        {searching && <p className="text-sm text-gray-500">Searching...</p>}

        {searchResults.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Phone</th>
                  <th className="p-3 text-left">Service</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((r) => (
                  <tr key={r._id} className="border-b">
                    <td className="p-3">{r.fullName}</td>
                    <td className="p-3">{r.phone}</td>
                    <td className="p-3">{r.serviceName || "-"}</td>
                    <td className="p-3">
                      {r.appointmentDate
                        ? new Date(r.appointmentDate).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="p-3">{r.appointmentStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
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
