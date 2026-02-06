
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAppointments,
  updateAppointment,
} from "../../Redux/slices/cusomerSlice/appointmentSlice";
import {
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  User,
  Calendar,
  Phone,
  AlertTriangle,
} from "lucide-react";

export default function PendingAppointments() {
  const dispatch = useDispatch();
  const { list, loading, updatingId } = useSelector(
    (state) => state.appointments
  );

  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  const changeStatus = (id, status) => {
    dispatch(updateAppointment({ id, data: { status } })).then(() =>
      dispatch(fetchAppointments())
    );
  };

  /* =======================
     LOADING STATE
  ======================== */
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-500 font-medium">Loading appointments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow p-6 border">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Pending Appointments
          </h2>
          <p className="text-sm text-gray-500">
            Review appointments & check missing documents
          </p>
        </div>

        <span className="px-4 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm">
          {list.length} Pending
        </span>
      </div>

      {/* EMPTY STATE */}
      {list.length === 0 ? (
        <div className="border border-dashed rounded-xl py-12 text-center">
          <Clock className="mx-auto w-12 h-12 text-gray-300 mb-3" />
          <p className="font-medium text-gray-500">
            No pending appointments
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border rounded-xl overflow-hidden">
            <thead className="bg-gray-100 text-xs text-gray-600 uppercase">
              <tr>
                <th className="p-4 text-left">Customer</th>
                <th className="p-4 text-left">Service & Date</th>
                <th className="p-4 text-left">Documents</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {list.map((a) => {
                const missingDocs =
                  !a.documentsSubmitted ||
                  !a.identityProvided ||
                  !a.passportProvided;

                return (
                  <tr key={a._id} className="hover:bg-gray-50">
                    {/* CUSTOMER */}
                    <td className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">
                            {a.customerId?.fullName || "Unknown"}
                          </p>
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {a.customerId?.phone || "No phone"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* SERVICE */}
                    <td className="p-4">
                      <p className="inline-block bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium mb-2">
                        {a.serviceId?.name || "Unknown Service"}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {new Date(a.appointmentDate).toLocaleString()}
                      </p>
                    </td>

                    {/* DOCUMENT STATUS */}
                    <td className="p-4">
                      {missingDocs ? (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                          <div className="flex items-center gap-2 text-red-700 font-medium mb-2">
                            <AlertTriangle className="w-4 h-4" />
                            Required Documents
                          </div>

                          <ul className="text-sm space-y-1">
                            <li className="flex items-center gap-1">
                              {a.identityProvided ? (
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              ) : (
                                <XCircle className="w-4 h-4 text-red-500" />
                              )}
                              Identity Card
                            </li>
                            <li className="flex items-center gap-1">
                              {a.passportProvided ? (
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              ) : (
                                <XCircle className="w-4 h-4 text-red-500" />
                              )}
                              Passport
                            </li>
                          </ul>
                        </div>
                      ) : (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-green-700 font-medium flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          All documents submitted
                        </div>
                      )}
                    </td>

                    {/* ACTIONS */}
                    <td className="p-4 text-center">
                      <div className="flex flex-col gap-2 min-w-[160px]">
                        <button
                          disabled={updatingId === a._id}
                          onClick={() => changeStatus(a._id, "APPROVED")}
                          className="bg-green-600 hover:bg-green-700 text-white rounded-lg py-2 text-sm font-medium disabled:opacity-50"
                        >
                          Approve
                        </button>

                        <button
                          disabled={updatingId === a._id}
                          onClick={() => changeStatus(a._id, "REJECTED")}
                          className="bg-red-600 hover:bg-red-700 text-white rounded-lg py-2 text-sm font-medium disabled:opacity-50"
                        >
                          Reject
                        </button>

                                           </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

