// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import {
//   fetchActiveServices,
//   checkServiceAvailability,
//   createPublicAppointment,
//   fetchAppointmentStatus,
//   clearAvailability,
//   clearBookingSuccess,
//   clearAppointmentStatus,
// } from  "../../Redux/slices/PublicSlice/publicAppointmentSlice";

// export default function PublicAppointmentPage() {
//   const dispatch = useDispatch();

//   const {
//     services,
//     servicesLoading,
//     availability,
//     availabilityLoading,
//     creating,
//     bookingSuccess,
//     appointmentStatus,
//     statusLoading,
//     error,
//   } = useSelector((state) => state.publicAppointment);

//   /* ---------------- STATE ---------------- */
//   const [selectedService, setSelectedService] = useState(null);
//   const [date, setDate] = useState("");

//   const [customer, setCustomer] = useState({
//     fullName: "",
//     phone: "",
//     email: "",
//     gender: "",
//   });

//   const [file, setFile] = useState(null);
//   const [searchId, setSearchId] = useState("");

//   /* ---------------- LOAD SERVICES ---------------- */
//   useEffect(() => {
//     dispatch(fetchActiveServices());
//   }, [dispatch]);

//   /* ---------------- HANDLERS ---------------- */
//   const handleCheckAvailability = () => {
//     if (!selectedService || !date) return;
//     dispatch(
//       checkServiceAvailability({
//         serviceId: selectedService._id,
//         date,
//       })
//     );
//   };

//   const handleCreateAppointment = () => {
//     const formData = new FormData();
//     formData.append("fullName", customer.fullName);
//     formData.append("phone", customer.phone);
//     formData.append("email", customer.email);
//     formData.append("gender", customer.gender);
//     formData.append("serviceId", selectedService._id);
//     formData.append("appointmentDate", date);

//     if (file) {
//       formData.append("file", file);
//     }

//     dispatch(createPublicAppointment(formData));
//   };

//   const handleSearchAppointment = () => {
//     if (!searchId) return;
//     dispatch(fetchAppointmentStatus(searchId));
//   };

//   /* ---------------- UI ---------------- */
//   return (
//     <div className="max-w-4xl mx-auto p-6 space-y-10">
//       <h1 className="text-2xl font-bold text-center">
//         Public Appointment Booking
//       </h1>

//       {/* ================= SERVICES ================= */}
//       <section>
//         <h2 className="font-semibold mb-2">1️⃣ Choose Service</h2>

//         {servicesLoading && <p>Loading services...</p>}

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//           {services.map((service) => (
//             <button
//               key={service._id}
//               onClick={() => {
//                 setSelectedService(service);
//                 dispatch(clearAvailability());
//               }}
//               className={`p-3 border rounded text-left ${
//                 selectedService?._id === service._id
//                   ? "border-blue-600 bg-blue-50"
//                   : ""
//               }`}
//             >
//               <p className="font-medium">{service.name}</p>
//             </button>
//           ))}
//         </div>
//       </section>

//       {/* ================= DATE & AVAILABILITY ================= */}
//       {selectedService && (
//         <section>
//           <h2 className="font-semibold mb-2">2️⃣ Choose Date</h2>

//           <div className="flex gap-3">
//             <input
//               type="date"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//               className="border p-2 rounded"
//             />
//             <button
//               onClick={handleCheckAvailability}
//               className="bg-blue-600 text-white px-4 rounded"
//             >
//               Check Availability
//             </button>
//           </div>

//           {availabilityLoading && <p>Checking...</p>}

//           {availability && (
//             <p className="mt-2">
//               {availability.available ? (
//                 <span className="text-green-600">
//                   ✅ Available ({availability.remaining} slots left)
//                 </span>
//               ) : (
//                 <span className="text-red-600">❌ Fully Booked</span>
//               )}
//             </p>
//           )}
//         </section>
//       )}

//       {/* ================= CUSTOMER FORM ================= */}
//       {availability?.available && (
//         <section>
//           <h2 className="font-semibold mb-2">
//             3️⃣ Customer Information
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//             <input
//               placeholder="Full Name"
//               className="border p-2 rounded"
//               onChange={(e) =>
//                 setCustomer({ ...customer, fullName: e.target.value })
//               }
//             />
//             <input
//               placeholder="Phone"
//               className="border p-2 rounded"
//               onChange={(e) =>
//                 setCustomer({ ...customer, phone: e.target.value })
//               }
//             />
//             <input
//               placeholder="Email"
//               className="border p-2 rounded"
//               onChange={(e) =>
//                 setCustomer({ ...customer, email: e.target.value })
//               }
//             />
//             <select
//               className="border p-2 rounded"
//               onChange={(e) =>
//                 setCustomer({ ...customer, gender: e.target.value })
//               }
//             >
//               <option value="">Select Gender</option>
//               <option value="MALE">Male</option>
//               <option value="FEMALE">Female</option>
//             </select>

//             <input
//               type="file"
//               accept="application/pdf"
//               onChange={(e) => setFile(e.target.files[0])}
//             />
//           </div>

//           <button
//             onClick={handleCreateAppointment}
//             disabled={creating}
//             className="mt-4 bg-green-600 text-white px-6 py-2 rounded"
//           >
//             {creating ? "Submitting..." : "Submit Appointment"}
//           </button>
//         </section>
//       )}

//       {/* ================= SUCCESS ================= */}
//       {bookingSuccess && (
//         <section className="p-4 border rounded bg-green-50">
//           <p className="font-semibold text-green-700">
//             ✅ Appointment Created Successfully
//           </p>
//           <p>
//             Appointment ID:{" "}
//             <span className="font-mono">
//               {bookingSuccess.appointmentId}
//             </span>
//           </p>
//         </section>
//       )}

//       {/* ================= SEARCH STATUS ================= */}
//       <section>
//         <h2 className="font-semibold mb-2">
//           🔍 Check Appointment Status
//         </h2>

//         <div className="flex gap-3">
//           <input
//             placeholder="Enter Appointment ID"
//             className="border p-2 rounded flex-1"
//             value={searchId}
//             onChange={(e) => setSearchId(e.target.value)}
//           />
//           <button
//             onClick={handleSearchAppointment}
//             className="bg-gray-800 text-white px-4 rounded"
//           >
//             Search
//           </button>
//         </div>

//         {statusLoading && <p>Loading status...</p>}

//         {appointmentStatus && (
//           <div className="mt-3 border p-3 rounded">
//             <p>Service: {appointmentStatus.service.name}</p>
//             <p>Date: {appointmentStatus.appointmentDate}</p>
//             <p>Status: {appointmentStatus.status}</p>
//           </div>
//         )}
//       </section>

//       {error && <p className="text-red-600">{error}</p>}
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  fetchActiveServices,
  checkServiceAvailability,
  createPublicAppointment,
  fetchAppointmentStatus,
  clearAvailability,
  clearBookingSuccess,
  clearAppointmentStatus,
} from "../../Redux/slices/PublicSlice/publicAppointmentSlice";

export default function PublicAppointmentPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    services,
    servicesLoading,
    availability,
    availabilityLoading,
    creating,
    bookingSuccess,
    appointmentStatus,
    statusLoading,
    error,
  } = useSelector((state) => state.publicAppointment);

  /* ---------------- STATE ---------------- */
  const [selectedService, setSelectedService] = useState(null);
  const [date, setDate] = useState("");

  const [customer, setCustomer] = useState({
    fullName: "",
    phone: "",
    email: "",
    gender: "",
  });

  const [file, setFile] = useState(null);
  const [searchId, setSearchId] = useState("");

  /* ---------------- LOAD SERVICES ---------------- */
  useEffect(() => {
    dispatch(fetchActiveServices());
  }, [dispatch]);

  /* ---------------- HANDLERS ---------------- */
  const handleCheckAvailability = () => {
    if (!selectedService || !date) return;
    dispatch(
      checkServiceAvailability({
        serviceId: selectedService._id,
        date,
      })
    );
  };

  const handleCreateAppointment = () => {
    const formData = new FormData();
    formData.append("fullName", customer.fullName);
    formData.append("phone", customer.phone);
    formData.append("email", customer.email);
    formData.append("gender", customer.gender);
    formData.append("serviceId", selectedService._id);
    formData.append("appointmentDate", date);

    if (file) {
      formData.append("file", file);
    }

    dispatch(createPublicAppointment(formData));
  };

  const handleSearchAppointment = () => {
    if (!searchId) return;
    dispatch(fetchAppointmentStatus(searchId));
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gray-50">
      {/* =================================================
         TOP HEADER / NAVBAR
      ================================================= */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-gray-800">
              Appointment Booking
            </h1>
            <p className="text-sm text-gray-500">
              Book your service easily
            </p>
          </div>

          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md font-medium transition"
          >
            Login
          </button>
        </div>
      </header>

      {/* =================================================
         MAIN CONTENT
      ================================================= */}
      <main className="max-w-4xl mx-auto p-6 space-y-10">
        {/* ================= SERVICES ================= */}
        <section>
          <h2 className="font-semibold mb-3 text-lg">
            1️⃣ Choose Service
          </h2>

          {servicesLoading && <p>Loading services...</p>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service) => (
              <button
                key={service._id}
                onClick={() => {
                  setSelectedService(service);
                  dispatch(clearAvailability());
                }}
                className={`p-4 border rounded-lg text-left transition ${
                  selectedService?._id === service._id
                    ? "border-blue-600 bg-blue-50"
                    : "hover:border-gray-400 bg-white"
                }`}
              >
                <p className="font-medium text-gray-800">
                  {service.name}
                </p>
              </button>
            ))}
          </div>
        </section>

        {/* ================= DATE & AVAILABILITY ================= */}
        {selectedService && (
          <section>
            <h2 className="font-semibold mb-3 text-lg">
              2️⃣ Choose Date
            </h2>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border p-2 rounded-md"
              />
              <button
                onClick={handleCheckAvailability}
                className="bg-blue-600 text-white px-5 py-2 rounded-md"
              >
                Check Availability
              </button>
            </div>

            {availabilityLoading && <p>Checking...</p>}

            {availability && (
              <p className="mt-3">
                {availability.available ? (
                  <span className="text-green-600 font-medium">
                    ✅ Available ({availability.remaining} slots left)
                  </span>
                ) : (
                  <span className="text-red-600 font-medium">
                    ❌ Fully Booked
                  </span>
                )}
              </p>
            )}
          </section>
        )}

        {/* ================= CUSTOMER FORM ================= */}
        {availability?.available && (
          <section>
            <h2 className="font-semibold mb-3 text-lg">
              3️⃣ Customer Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                placeholder="Full Name"
                className="border p-2 rounded-md"
                onChange={(e) =>
                  setCustomer({ ...customer, fullName: e.target.value })
                }
              />
              <input
                placeholder="Phone"
                className="border p-2 rounded-md"
                onChange={(e) =>
                  setCustomer({ ...customer, phone: e.target.value })
                }
              />
              <input
                placeholder="Email"
                className="border p-2 rounded-md"
                onChange={(e) =>
                  setCustomer({ ...customer, email: e.target.value })
                }
              />
              <select
                className="border p-2 rounded-md"
                onChange={(e) =>
                  setCustomer({ ...customer, gender: e.target.value })
                }
              >
                <option value="">Select Gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
              </select>

              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>

            <button
              onClick={handleCreateAppointment}
              disabled={creating}
              className="mt-5 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md"
            >
              {creating ? "Submitting..." : "Submit Appointment"}
            </button>
          </section>
        )}

        {/* ================= SUCCESS ================= */}
        {bookingSuccess && (
          <section className="p-4 border rounded-lg bg-green-50">
            <p className="font-semibold text-green-700">
              ✅ Appointment Created Successfully
            </p>
            <p className="mt-1">
              Appointment ID:{" "}
              <span className="font-mono">
                {bookingSuccess.appointmentId}
              </span>
            </p>
          </section>
        )}

        {/* ================= SEARCH STATUS ================= */}
        <section>
          <h2 className="font-semibold mb-3 text-lg">
            🔍 Check Appointment Status
          </h2>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              placeholder="Enter Appointment ID"
              className="border p-2 rounded-md flex-1"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
            <button
              onClick={handleSearchAppointment}
              className="bg-gray-800 text-white px-5 py-2 rounded-md"
            >
              Search
            </button>
          </div>

          {statusLoading && <p className="mt-2">Loading status...</p>}

          {appointmentStatus && (
            <div className="mt-4 border p-4 rounded-lg bg-white">
              <p>
                <strong>Service:</strong>{" "}
                {appointmentStatus.service.name}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {appointmentStatus.appointmentDate}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {appointmentStatus.status}
              </p>
            </div>
          )}
        </section>

        {error && (
          <p className="text-red-600 font-medium">
            {error}
          </p>
        )}
      </main>
    </div>
  );
}

