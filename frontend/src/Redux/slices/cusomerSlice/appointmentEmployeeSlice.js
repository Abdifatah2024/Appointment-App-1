import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/axios";

/* ============================================
   GET MY ASSIGNED APPROVED APPOINTMENTS
============================================ */
export const fetchMyApprovedAppointments = createAsyncThunk(
  "appointmentEmployee/fetchMyApprovedAppointments",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      if (!token) {
        return rejectWithValue("Authentication token missing");
      }

      const res = await api.get(
        "/appointments/my/appointments",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
          "Failed to fetch assigned appointments"
      );
    }
  }
);

/* ============================================
   EMPLOYEE DASHBOARD ANALYTICS
============================================ */
export const fetchEmployeeDashboardAnalytics = createAsyncThunk(
  "appointmentEmployee/fetchEmployeeDashboardAnalytics",
  async ({ month, year }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      if (!token) {
        return rejectWithValue("Authentication token missing");
      }

      const res = await api.get(
        `/appointments/my/dashboard/analytics?month=${month}&year=${year}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
          "Failed to load dashboard analytics"
      );
    }
  }
);

/* ============================================
   SLICE
============================================ */
const appointmentEmployeeSlice = createSlice({
  name: "appointmentEmployee",

  initialState: {
    appointments: [],
    loadingAppointments: false,

    dashboardLoading: false,
    dashboardError: null,

    summary: {
      totalAssigned: 0,
      completed: 0,
      approvedPending: 0,
      noShow: 0,
    },

    byGender: {
      MALE: 0,
      FEMALE: 0,
    },

    byService: {},

    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    /* ---------- APPROVED APPOINTMENTS ---------- */
    builder
      .addCase(fetchMyApprovedAppointments.pending, (state) => {
        state.loadingAppointments = true;
        state.error = null;
      })
      .addCase(fetchMyApprovedAppointments.fulfilled, (state, action) => {
        state.loadingAppointments = false;
        state.appointments = action.payload;
      })
      .addCase(fetchMyApprovedAppointments.rejected, (state, action) => {
        state.loadingAppointments = false;
        state.error = action.payload;
      });

    /* ---------- DASHBOARD ANALYTICS ---------- */
    builder
      .addCase(fetchEmployeeDashboardAnalytics.pending, (state) => {
        state.dashboardLoading = true;
        state.dashboardError = null;
      })
      .addCase(fetchEmployeeDashboardAnalytics.fulfilled, (state, action) => {
        state.dashboardLoading = false;

        state.summary =
          action.payload?.data?.summary || state.summary;

        state.byGender =
          action.payload?.data?.byGender || state.byGender;

        state.byService =
          action.payload?.data?.byService || {};
      })
      .addCase(fetchEmployeeDashboardAnalytics.rejected, (state, action) => {
        state.dashboardLoading = false;
        state.dashboardError = action.payload;
      });
  },
});

export default appointmentEmployeeSlice.reducer;
