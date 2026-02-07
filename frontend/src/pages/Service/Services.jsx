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

import { useEffect, useState } from "react";
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

  const {
    list,
    loading,
    creating,
    updatingId,
    deletingId,
  } = useSelector((state) => state.services);

  const [openModal, setOpenModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  /* ================================
     FETCH SERVICES
  ================================ */
  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  /* ================================
     SAVE (CREATE / UPDATE)
  ================================ */
  const handleSave = (data) => {
    if (selectedService) {
      dispatch(updateService({ id: selectedService._id, data }));
    } else {
      dispatch(createService(data));
    }

    setOpenModal(false);
    setSelectedService(null);
  };

  /* ================================
     DELETE
  ================================ */
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      dispatch(deleteService(id));
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Services</h1>

        <button
          onClick={() => {
            setSelectedService(null);
            setOpenModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Register Service
        </button>
      </div>

      {/* TABLE */}
      {loading ? (
        <p className="text-gray-500">Loading services...</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr className="border-b text-sm text-gray-600">
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Code</th>
                <th className="p-3 text-left">Requirements</th>
                <th className="p-3 text-left">Daily Limit</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {list.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="p-6 text-center text-gray-500"
                  >
                    No services found
                  </td>
                </tr>
              )}

              {list.map((s) => (
                <tr key={s._id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium">{s.name}</td>
                  <td className="p-3">{s.code}</td>

                  <td className="p-3 text-sm text-gray-700">
                    {[
                      s.requiresIdentity && "ID",
                      s.requiresPassport && "Passport",
                      s.requiresDocuments && "Documents",
                    ]
                      .filter(Boolean)
                      .join(", ") || "None"}
                  </td>

                  <td className="p-3">
                    {s.maxCustomersPerDay === 0
                      ? "Unlimited"
                      : s.maxCustomersPerDay}
                  </td>

                  <td className="p-3 text-right space-x-4">
                    <button
                      disabled={updatingId === s._id}
                      onClick={() => {
                        setSelectedService(s);
                        setOpenModal(true);
                      }}
                      className="text-blue-600 hover:underline disabled:opacity-60"
                    >
                      {updatingId === s._id ? "Updating..." : "Edit"}
                    </button>

                    <button
                      disabled={deletingId === s._id}
                      onClick={() => handleDelete(s._id)}
                      className="text-red-600 hover:underline disabled:opacity-60"
                    >
                      {deletingId === s._id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

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

