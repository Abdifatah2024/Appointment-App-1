import { useEffect, useState } from "react";

export default function CustomerModal({
  open,
  onClose,
  onSubmit,
  loading,
  initialData,
}) {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        fullName: initialData.fullName || "",
        phone: initialData.phone || "",
        email: initialData.email || "",
      });
    } else {
      setForm({ fullName: "", phone: "", email: "" });
    }
  }, [initialData]);

  if (!open) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">
          {initialData ? "Edit Customer" : "Register Customer"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="fullName"
            required
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          />

          <input
            name="phone"
            required
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          />

          <input
            name="email"
            placeholder="Email (optional)"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          />

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

