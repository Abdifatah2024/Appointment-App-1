import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/axios";

/* ================================
   FETCH APPOINTMENT DASHBOARD
================================ */
export const fetchAppointmentDashboard = createAsyncThunk(
  "appointmentDashboard/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/appointments/dashboard");
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to load dashboard"
      );
    }
  }
);

const appointmentDashboardSlice = createSlice({
  name: "appointmentDashboard",

  initialState: {
    loading: false,
    error: null,

    totals: {
      total: 0,
      todayRequests: 0,
    },

    byStatus: {
      pending: 0,
      approved: 0,
      completed: 0,
      rejected: 0,
      cancelled: 0,
      noShow: 0,
    },

    // OPTIONAL (backend may not send yet)
    byGender: {
      MALE: 0,
      FEMALE: 0,
      OTHER: 0,
      UNKNOWN: 0,
    },

    usersProgress: [],

    lastActivities: [],
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointmentDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAppointmentDashboard.fulfilled, (state, action) => {
        state.loading = false;

        state.totals = action.payload?.totals || state.totals;
        state.byStatus = action.payload?.byStatus || state.byStatus;
        state.lastActivities = action.payload?.lastActivities || [];

        // SAFE FALLBACKS (IMPORTANT)
        state.byGender =
          action.payload?.byGender || state.byGender;

        state.usersProgress =
          action.payload?.usersProgress || [];
      })

      .addCase(fetchAppointmentDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default appointmentDashboardSlice.reducer;
