
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
import { useEffect, useState } from "react";
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

  /* ================================
     FETCH CUSTOMERS ON LOAD
  ================================ */
  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  /* ================================
     SEARCH CUSTOMER STATUS
  ================================ */
  useEffect(() => {
    if (search.trim().length >= 2) {
      dispatch(searchCustomersWithStatus(search));
    } else {
      dispatch(clearCustomerSearch());
    }
  }, [search, dispatch]);

  /* ================================
     CREATE / UPDATE
  ================================ */
  const handleSave = (data) => {
    if (selectedCustomer) {
      dispatch(updateCustomer({ id: selectedCustomer._id, data }));
    } else {
      dispatch(createCustomer(data));
    }

    setOpenModal(false);
    setSelectedCustomer(null);
  };

  /* ================================
     DELETE
  ================================ */
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      dispatch(deleteCustomer(id));
    }
  };

  return (
    <div className="space-y-10">
      {/* =================================================
          SECTION 1: REGISTER / MANAGE CUSTOMERS
      ================================================= */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Customers</h1>

          <button
            onClick={() => {
              setSelectedCustomer(null);
              setOpenModal(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            + Register Customer
          </button>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading customers...</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr className="border-b text-sm text-gray-600">
                  <th className="p-3 text-left">Full Name</th>
                  <th className="p-3 text-left">Phone</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Gender</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {list.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="p-4 text-center text-gray-500"
                    >
                      No customers found
                    </td>
                  </tr>
                ) : (
                  list.map((c) => (
                    <tr key={c._id} className="border-b hover:bg-gray-50">
                      <td className="p-3">{c.fullName}</td>
                      <td className="p-3">{c.phone}</td>
                      <td className="p-3">{c.email || "-"}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            c.gender === "MALE"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-pink-100 text-pink-800"
                          }`}
                        >
                          {c.gender}
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-4">
                        <button
                          onClick={() => {
                            setSelectedCustomer(c);
                            setOpenModal(true);
                          }}
                          className="text-blue-600 hover:underline"
                        >
                          {updatingId === c._id ? "Updating..." : "Edit"}
                        </button>

                        <button
                          onClick={() => handleDelete(c._id)}
                          className="text-red-600 hover:underline"
                        >
                          {deletingId === c._id ? "Deleting..." : "Delete"}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* =================================================
          SECTION 2: SEARCH & VIEW APPOINTMENT STATUS
      ================================================= */}
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <h2 className="text-lg font-semibold">
          Search Customer Appointment Status
        </h2>

        <input
          type="text"
          placeholder="Search by name or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-lg px-4 py-2"
        />

        {searching && (
          <p className="text-sm text-gray-500">Searching...</p>
        )}

        {!searching && searchResults.length === 0 && search.length >= 2 && (
          <p className="text-sm text-gray-500">
            No appointment records found
          </p>
        )}

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
                        ? new Date(
                            r.appointmentDate
                          ).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold
                          ${
                            r.appointmentStatus === "PENDING"
                              ? "bg-yellow-100 text-yellow-800"
                              : r.appointmentStatus === "APPROVED"
                              ? "bg-blue-100 text-blue-800"
                              : r.appointmentStatus === "COMPLETED"
                              ? "bg-green-100 text-green-800"
                              : r.appointmentStatus === "REJECTED"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-600"
                          }`}
                      >
                        {r.appointmentStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* =================================================
          CUSTOMER MODAL
      ================================================= */}
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


