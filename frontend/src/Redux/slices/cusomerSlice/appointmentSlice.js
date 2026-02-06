import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/axios";

/* ================================
   FETCH APPOINTMENTS
================================ */
export const fetchAppointments = createAsyncThunk(
  "appointments/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/appointments");
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch appointments"
      );
    }
  }
);

/* ================================
   CREATE APPOINTMENT
================================ */
export const createAppointment = createAsyncThunk(
  "appointments/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/appointments", data);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create appointment"
      );
    }
  }
);

/* ================================
   UPDATE APPOINTMENT
================================ */
export const updateAppointment = createAsyncThunk(
  "appointments/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/appointments/${id}`, data);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update appointment"
      );
    }
  }
);

/* ================================
   DELETE APPOINTMENT (SOFT)
================================ */
export const deleteAppointment = createAsyncThunk(
  "appointments/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/appointments/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete appointment"
      );
    }
  }
);

/* ================================
   SLICE
================================ */
const appointmentSlice = createSlice({
  name: "appointments",
  initialState: {
    list: [],
    loading: false,
    error: null,
    creating: false,
    updatingId: null,
    deletingId: null,
  },

  reducers: {
    clearAppointmentError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      /* ---------- FETCH ---------- */
      .addCase(fetchAppointments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload || [];
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- CREATE ---------- */
      .addCase(createAppointment.pending, (state) => {
        state.creating = true;
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.creating = false;
        state.list.unshift(action.payload);
      })
      .addCase(createAppointment.rejected, (state, action) => {
        state.creating = false;
        state.error = action.payload;
      })

      /* ---------- UPDATE ---------- */
      .addCase(updateAppointment.pending, (state, action) => {
        state.updatingId = action.meta.arg.id;
      })
      .addCase(updateAppointment.fulfilled, (state, action) => {
        state.updatingId = null;
        const idx = state.list.findIndex(
          (a) => a._id === action.payload._id
        );
        if (idx !== -1) state.list[idx] = action.payload;
      })
      .addCase(updateAppointment.rejected, (state, action) => {
        state.updatingId = null;
        state.error = action.payload;
      })

      /* ---------- DELETE ---------- */
      .addCase(deleteAppointment.pending, (state, action) => {
        state.deletingId = action.meta.arg;
      })
      .addCase(deleteAppointment.fulfilled, (state, action) => {
        state.deletingId = null;
        state.list = state.list.filter(
          (a) => a._id !== action.payload
        );
      })
      .addCase(deleteAppointment.rejected, (state, action) => {
        state.deletingId = null;
        state.error = action.payload;
      });
  },
});

/* ================================
   EXPORTS
================================ */
export const { clearAppointmentError } = appointmentSlice.actions;
export default appointmentSlice.reducer;
