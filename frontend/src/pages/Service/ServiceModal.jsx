// import { useEffect, useState } from "react";

// export default function ServiceModal({
//   open,
//   onClose,
//   onSubmit,
//   loading,
//   initialData,
// }) {
//   const [form, setForm] = useState({
//     name: "",
//     code: "",
//     description: "",
//     requiresDocuments: true,
//     requiresIdentity: false,
//     requiresPassport: false,
//     approvalRequired: true,
//     maxCustomersPerDay: 0,
//     isActive: true,
//   });

//   useEffect(() => {
//     if (initialData) {
//       setForm({
//         ...initialData,
//         maxCustomersPerDay: initialData.maxCustomersPerDay || 0,
//       });
//     } else {
//       setForm({
//         name: "",
//         code: "",
//         description: "",
//         requiresDocuments: true,
//         requiresIdentity: false,
//         requiresPassport: false,
//         approvalRequired: true,
//         maxCustomersPerDay: 0,
//         isActive: true,
//       });
//     }
//   }, [initialData]);

//   if (!open) return null;

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm({
//       ...form,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(form);
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//       <div className="bg-white w-full max-w-xl rounded-xl p-6">
//         <h2 className="text-lg font-semibold mb-4">
//           {initialData ? "Edit Service" : "Register Service"}
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="grid grid-cols-2 gap-4">
//             <input
//               name="name"
//               required
//               placeholder="Service Name"
//               value={form.name}
//               onChange={handleChange}
//               className="border rounded-lg px-4 py-2"
//             />

//             <input
//               name="code"
//               required
//               placeholder="Service Code"
//               value={form.code}
//               onChange={handleChange}
//               className="border rounded-lg px-4 py-2"
//             />
//           </div>

//           <textarea
//             name="description"
//             placeholder="Description"
//             value={form.description}
//             onChange={handleChange}
//             className="w-full border rounded-lg px-4 py-2"
//           />

//           <div className="grid grid-cols-2 gap-3 text-sm">
//             <label><input type="checkbox" name="requiresDocuments" checked={form.requiresDocuments} onChange={handleChange} /> Requires Documents</label>
//             <label><input type="checkbox" name="requiresIdentity" checked={form.requiresIdentity} onChange={handleChange} /> Requires Identity</label>
//             <label><input type="checkbox" name="requiresPassport" checked={form.requiresPassport} onChange={handleChange} /> Requires Passport</label>
//             <label><input type="checkbox" name="approvalRequired" checked={form.approvalRequired} onChange={handleChange} /> Approval Required</label>
//             <label><input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} /> Active</label>
//           </div>

//           <input
//             type="number"
//             name="maxCustomersPerDay"
//             min="0"
//             value={form.maxCustomersPerDay}
//             onChange={handleChange}
//             className="w-full border rounded-lg px-4 py-2"
//             placeholder="Max Customers Per Day (0 = unlimited)"
//           />

//           <div className="flex justify-end gap-3 pt-4">
//             <button type="button" onClick={onClose} className="border px-4 py-2 rounded-lg">
//               Cancel
//             </button>
//             <button disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
//               {loading ? "Saving..." : "Save"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";

export default function ServiceModal({
  open,
  onClose,
  onSubmit,
  loading,
  initialData,
}) {
  const [form, setForm] = useState({
    name: "",
    code: "",
    description: "",
    requiresDocuments: true,
    requiresIdentity: false,
    requiresPassport: false,
    approvalRequired: true,
    maxCustomersPerDay: 0,
    isActive: true,
  });

  /* ================================
     PREFILL ON EDIT
  ================================ */
  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        code: initialData.code || "",
        description: initialData.description || "",
        requiresDocuments: initialData.requiresDocuments ?? true,
        requiresIdentity: initialData.requiresIdentity ?? false,
        requiresPassport: initialData.requiresPassport ?? false,
        approvalRequired: initialData.approvalRequired ?? true,
        maxCustomersPerDay: initialData.maxCustomersPerDay ?? 0,
        isActive: initialData.isActive ?? true,
      });
    } else {
      setForm({
        name: "",
        code: "",
        description: "",
        requiresDocuments: true,
        requiresIdentity: false,
        requiresPassport: false,
        approvalRequired: true,
        maxCustomersPerDay: 0,
        isActive: true,
      });
    }
  }, [initialData]);

  if (!open) return null;

  /* ================================
     HANDLE CHANGE
  ================================ */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "maxCustomersPerDay"
          ? Number(value)
          : value,
    }));
  };

  /* ================================
     SUBMIT
  ================================ */
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-xl rounded-xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">
          {initialData ? "Edit Service" : "Register Service"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* NAME & CODE */}
          <div className="grid grid-cols-2 gap-4">
            <input
              name="name"
              required
              placeholder="Service Name"
              value={form.name}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2"
            />

            <input
              name="code"
              required
              placeholder="Service Code"
              value={form.code}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2"
            />
          </div>

          {/* DESCRIPTION */}
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          />

          {/* FLAGS */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="requiresDocuments"
                checked={form.requiresDocuments}
                onChange={handleChange}
              />
              Requires Documents
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="requiresIdentity"
                checked={form.requiresIdentity}
                onChange={handleChange}
              />
              Requires Identity
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="requiresPassport"
                checked={form.requiresPassport}
                onChange={handleChange}
              />
              Requires Passport
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="approvalRequired"
                checked={form.approvalRequired}
                onChange={handleChange}
              />
              Approval Required
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isActive"
                checked={form.isActive}
                onChange={handleChange}
              />
              Active
            </label>
          </div>

          {/* MAX PER DAY */}
          <input
            type="number"
            name="maxCustomersPerDay"
            min="0"
            value={form.maxCustomersPerDay}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
            placeholder="Max Customers Per Day (0 = unlimited)"
          />

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="border px-4 py-2 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

