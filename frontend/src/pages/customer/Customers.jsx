import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
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
  } = useSelector((state) => state.customers);

  const [openModal, setOpenModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // FETCH ON LOAD
  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  // CREATE / UPDATE
  const handleSave = (data) => {
    if (selectedCustomer) {
      dispatch(
        updateCustomer({
          id: selectedCustomer._id,
          data,
        })
      );
    } else {
      dispatch(createCustomer(data));
    }

    setOpenModal(false);
    setSelectedCustomer(null);
  };

  // DELETE
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      dispatch(deleteCustomer(id));
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
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

      {/* TABLE */}
      {loading ? (
        <p>Loading customers...</p>
      ) : (
        <table className="w-full bg-white rounded-lg shadow">
          <thead>
            <tr className="border-b">
              <th className="p-3 text-left">Full Name</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No customers found
                </td>
              </tr>
            ) : (
              list.map((c) => (
                <tr key={c._id} className="border-b">
                  <td className="p-3">{c.fullName}</td>
                  <td className="p-3">{c.phone}</td>
                  <td className="p-3">{c.email || "-"}</td>
                  <td className="p-3 text-right space-x-3">
                    <button
                      onClick={() => {
                        setSelectedCustomer(c);
                        setOpenModal(true);
                      }}
                      className="text-blue-600"
                    >
                      {updatingId === c._id ? "Updating..." : "Edit"}
                    </button>

                    <button
                      onClick={() => handleDelete(c._id)}
                      className="text-red-600"
                    >
                      {deletingId === c._id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      {/* MODAL */}
      <CustomerModal
        open={openModal}
        initialData={selectedCustomer}
        loading={creating || !!updatingId}
        onClose={() => {
          setOpenModal(false);
          setSelectedCustomer(null);
        }}
        onSubmit={handleSave}
      />
    </div>
  );
}
