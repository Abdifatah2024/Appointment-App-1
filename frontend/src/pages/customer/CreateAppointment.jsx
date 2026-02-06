// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import { fetchCustomers } from "../../Redux/slices/cusomerSlice/customerSlice";
// import { fetchServices } from "../../Redux/slices/cusomerSlice/serviceSlice";
// import { createAppointment } from "../../Redux/slices/cusomerSlice/appointmentSlice";

// export default function CreateAppointment() {
//   const dispatch = useDispatch();

//   const { list: customers, loading: customerLoading } = useSelector(
//     (state) => state.customers
//   );
//   const { list: services, loading: serviceLoading } = useSelector(
//     (state) => state.services
//   );
//   const { creating } = useSelector((state) => state.appointments);

//   const [searchCustomer, setSearchCustomer] = useState("");
//   const [showCustomerList, setShowCustomerList] = useState(false);

//   const [form, setForm] = useState({
//     customerId: "",
//     serviceId: "",
//     appointmentDate: "",
//     notes: "",
//   });

//   /* ================================
//      FETCH DATA
//   ================================ */
//   useEffect(() => {
//     dispatch(fetchCustomers());
//     dispatch(fetchServices());
//   }, [dispatch]);

//   /* ================================
//      FILTER CUSTOMERS (SEARCH)
//   ================================ */
//   const filteredCustomers = customers.filter((c) =>
//     c.fullName.toLowerCase().includes(searchCustomer.toLowerCase())
//   );

//   /* ================================
//      SUBMIT
//   ================================ */
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!form.customerId || !form.serviceId || !form.appointmentDate) {
//       alert("Please fill all required fields");
//       return;
//     }

//     dispatch(createAppointment(form));

//     setForm({
//       customerId: "",
//       serviceId: "",
//       appointmentDate: "",
//       notes: "",
//     });
//     setSearchCustomer("");
//   };

//   return (
//     <div className="max-w-xl bg-white p-6 rounded-lg shadow">
//       <h2 className="text-xl font-semibold mb-4">Create Appointment</h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* ================= CUSTOMER SEARCH DROPDOWN ================= */}
//         <div>
//           <label className="block text-sm font-medium mb-1">
//             Customer <span className="text-red-500">*</span>
//           </label>

//           <input
//             type="text"
//             placeholder="Search customer name..."
//             value={searchCustomer}
//             onChange={(e) => {
//               setSearchCustomer(e.target.value);
//               setShowCustomerList(true);
//             }}
//             onFocus={() => setShowCustomerList(true)}
//             className="w-full border rounded px-3 py-2"
//           />

//           {showCustomerList && searchCustomer && (
//             <div className="border mt-1 max-h-40 overflow-y-auto rounded bg-white z-10">
//               {filteredCustomers.length === 0 && (
//                 <p className="p-2 text-sm text-gray-500">
//                   No customer found
//                 </p>
//               )}

//               {filteredCustomers.map((c) => (
//                 <div
//                   key={c._id}
//                   onClick={() => {
//                     setForm({ ...form, customerId: c._id });
//                     setSearchCustomer(c.fullName);
//                     setShowCustomerList(false);
//                   }}
//                   className="p-2 cursor-pointer hover:bg-gray-100 text-sm"
//                 >
//                   {c.fullName} — {c.phone}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* ================= SERVICE DROPDOWN ================= */}
//         <div>
//           <label className="block text-sm font-medium mb-1">
//             Service <span className="text-red-500">*</span>
//           </label>

//           <select
//             value={form.serviceId}
//             onChange={(e) =>
//               setForm({ ...form, serviceId: e.target.value })
//             }
//             className="w-full border rounded px-3 py-2"
//           >
//             <option value="">Select service</option>
//             {services.map((s) => (
//               <option key={s._id} value={s._id}>
//                 {s.name} ({s.code})
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* ================= DATE ================= */}
//         <div>
//           <label className="block text-sm font-medium mb-1">
//             Appointment Date <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="datetime-local"
//             value={form.appointmentDate}
//             onChange={(e) =>
//               setForm({ ...form, appointmentDate: e.target.value })
//             }
//             className="w-full border rounded px-3 py-2"
//           />
//         </div>

//         {/* ================= NOTES ================= */}
//         <div>
//           <label className="block text-sm font-medium mb-1">Notes</label>
//           <textarea
//             value={form.notes}
//             onChange={(e) =>
//               setForm({ ...form, notes: e.target.value })
//             }
//             rows={3}
//             className="w-full border rounded px-3 py-2"
//           />
//         </div>

//         {/* ================= SUBMIT ================= */}
//         <button
//           type="submit"
//           disabled={creating}
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-60"
//         >
//           {creating ? "Saving..." : "Create Appointment"}
//         </button>
//       </form>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchCustomers } from "../../Redux/slices/cusomerSlice/customerSlice";
import { fetchServices } from "../../Redux/slices/cusomerSlice/serviceSlice";
import { createAppointment } from "../../Redux/slices/cusomerSlice/appointmentSlice";

export default function CreateAppointment() {
  const dispatch = useDispatch();

  const { list: customers } = useSelector((state) => state.customers);
  const { list: services } = useSelector((state) => state.services);
  const { creating } = useSelector((state) => state.appointments);

  const [searchCustomer, setSearchCustomer] = useState("");
  const [showCustomerList, setShowCustomerList] = useState(false);

  const [form, setForm] = useState({
    customerId: "",
    serviceId: "",
    appointmentDate: "",
    documentsSubmitted: false,
    identityProvided: false,
    passportProvided: false,
    notes: "",
  });

  /* ================================
     FETCH DATA
  ================================ */
  useEffect(() => {
    dispatch(fetchCustomers());
    dispatch(fetchServices());
  }, [dispatch]);

  /* ================================
     FILTER CUSTOMERS
  ================================ */
  const filteredCustomers = customers.filter((c) =>
    c.fullName.toLowerCase().includes(searchCustomer.toLowerCase())
  );

  /* ================================
     SUBMIT
  ================================ */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.customerId || !form.serviceId || !form.appointmentDate) {
      alert("Please fill all required fields");
      return;
    }

    dispatch(createAppointment(form));

    setForm({
      customerId: "",
      serviceId: "",
      appointmentDate: "",
      documentsSubmitted: false,
      identityProvided: false,
      passportProvided: false,
      notes: "",
    });
    setSearchCustomer("");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">
        Create Appointment
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ================= CUSTOMER SEARCH ================= */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Customer <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            placeholder="Search customer name..."
            value={searchCustomer}
            onChange={(e) => {
              setSearchCustomer(e.target.value);
              setShowCustomerList(true);
            }}
            onFocus={() => setShowCustomerList(true)}
            className="w-full border rounded-lg px-3 py-2"
          />

          {showCustomerList && searchCustomer && (
            <div className="border mt-1 max-h-48 overflow-y-auto rounded-lg bg-white">
              {filteredCustomers.length === 0 && (
                <p className="p-3 text-sm text-gray-500">
                  No customer found
                </p>
              )}

              {filteredCustomers.map((c) => (
                <div
                  key={c._id}
                  onClick={() => {
                    setForm({ ...form, customerId: c._id });
                    setSearchCustomer(`${c.fullName} (${c.phone})`);
                    setShowCustomerList(false);
                  }}
                  className="p-3 cursor-pointer hover:bg-gray-100 text-sm"
                >
                  {c.fullName} — {c.phone}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ================= SERVICE ================= */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Service <span className="text-red-500">*</span>
          </label>

          <select
            value={form.serviceId}
            onChange={(e) =>
              setForm({ ...form, serviceId: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">Select service</option>
            {services.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name} ({s.code})
              </option>
            ))}
          </select>
        </div>

        {/* ================= DATE ================= */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Appointment Date <span className="text-red-500">*</span>
          </label>
          <input
            type="datetime-local"
            value={form.appointmentDate}
            onChange={(e) =>
              setForm({ ...form, appointmentDate: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* ================= DOCUMENT REQUIREMENTS ================= */}
        <div className="border rounded-lg p-4 bg-gray-50">
          <p className="text-sm font-medium mb-3">
            Required Documents
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.documentsSubmitted}
                onChange={(e) =>
                  setForm({
                    ...form,
                    documentsSubmitted: e.target.checked,
                  })
                }
              />
              Documents Submitted
            </label>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.identityProvided}
                onChange={(e) =>
                  setForm({
                    ...form,
                    identityProvided: e.target.checked,
                  })
                }
              />
              Identity Provided
            </label>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.passportProvided}
                onChange={(e) =>
                  setForm({
                    ...form,
                    passportProvided: e.target.checked,
                  })
                }
              />
              Passport Provided
            </label>
          </div>
        </div>

        {/* ================= NOTES ================= */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Notes
          </label>
          <textarea
            rows={3}
            value={form.notes}
            onChange={(e) =>
              setForm({ ...form, notes: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* ================= SUBMIT ================= */}
        <button
          type="submit"
          disabled={creating}
          className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-60"
        >
          {creating ? "Saving..." : "Create Appointment"}
        </button>
      </form>
    </div>
  );
}

