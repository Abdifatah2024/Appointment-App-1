import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAppointments,
  updateAppointment,
} from "../../Redux/slices/cusomerSlice/appointmentSlice";
import { CheckCircle, XCircle, Clock, FileText, User, Calendar, Phone } from "lucide-react";

export default function PendingAppointments() {
  const dispatch = useDispatch();
  const { list, loading, updatingId } = useSelector((state) => state.appointments);

  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  const changeStatus = (id, status) => {
    dispatch(updateAppointment({ id, data: { status } }))
      .then(() => {
        dispatch(fetchAppointments());
      });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading appointments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Pending Appointments
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Manage and review all pending appointment requests
          </p>
        </div>
        <div className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full font-medium">
          {list.length} pending
        </div>
      </div>

      {list.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
          <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 font-medium">No pending appointments</p>
          <p className="text-gray-400 text-sm mt-1">All appointments are processed</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
                <tr>
                  <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    #
                  </th>
                  <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Customer Details
                  </th>
                  <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Service & Date
                  </th>
                  <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Documents Status
                  </th>
                  <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {list.map((a, index) => (
                  <tr
                    key={a._id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    {/* Serial Number */}
                    <td className="p-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-700 font-semibold rounded-full">
                          {index + 1}
                        </div>
                      </div>
                    </td>

                    {/* Customer Details */}
                    <td className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {a.customerId?.fullName || "N/A"}
                          </p>
                          <div className="flex items-center mt-1 text-gray-500 text-sm">
                            <Phone className="w-3 h-3 mr-1" />
                            {a.customerId?.phone || "No phone"}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            ID: {a._id?.substring(0, 8)}...
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Service & Date */}
                    <td className="p-4">
                      <div className="space-y-2">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium">
                          {a.serviceId?.name || "Unknown Service"}
                        </div>
                        <div className="flex items-center text-gray-600 text-sm">
                          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                          {new Date(a.appointmentDate).toLocaleDateString('en-US', {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                    </td>

                    {/* Documents Status */}
                    <td className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <FileText className="w-4 h-4 mr-2 text-gray-400" />
                          <span className="text-sm text-gray-700">Documents:</span>
                          <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${a.documentsSubmitted
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                            }`}>
                            {a.documentsSubmitted ? "Submitted" : "Pending"}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <div className={`flex items-center px-2 py-1 rounded ${a.identityProvided
                              ? 'bg-green-50 text-green-700'
                              : 'bg-gray-100 text-gray-500'
                            }`}>
                            {a.identityProvided ? (
                              <CheckCircle className="w-3 h-3 mr-1" />
                            ) : (
                              <XCircle className="w-3 h-3 mr-1" />
                            )}
                            <span className="text-xs">ID</span>
                          </div>
                          <div className={`flex items-center px-2 py-1 rounded ${a.passportProvided
                              ? 'bg-green-50 text-green-700'
                              : 'bg-gray-100 text-gray-500'
                            }`}>
                            {a.passportProvided ? (
                              <CheckCircle className="w-3 h-3 mr-1" />
                            ) : (
                              <XCircle className="w-3 h-3 mr-1" />
                            )}
                            <span className="text-xs">Passport</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="p-4">
                      <div className="flex flex-col space-y-2 min-w-[200px]">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => changeStatus(a._id, "APPROVED")}
                            disabled={updatingId === a._id}
                            className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
                          >
                            {updatingId === a._id ? (
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            ) : (
                              <CheckCircle className="w-4 h-4 mr-2" />
                            )}
                            Approve
                          </button>
                          <button
                            onClick={() => changeStatus(a._id, "REJECTED")}
                            disabled={updatingId === a._id}
                            className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                          >
                            Reject
                          </button>
                        </div>
                        <button
                          onClick={() => changeStatus(a._id, "COMPLETED")}
                          disabled={updatingId === a._id}
                          className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                        >
                          Mark Complete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}