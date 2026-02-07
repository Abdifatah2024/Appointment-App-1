// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../../../utils/axios";

// /* ================================
//    FETCH SERVICES
// ================================ */
// export const fetchServices = createAsyncThunk(
//   "services/fetchAll",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await api.get("/services");
//       return res.data.data;
//     } catch (err) {
//       return rejectWithValue(
//         err.response?.data?.message || "Failed to fetch services"
//       );
//     }
//   }
// );

// /* ================================
//    CREATE SERVICE
// ================================ */
// export const createService = createAsyncThunk(
//   "services/create",
//   async (data, { rejectWithValue }) => {
//     try {
//       const res = await api.post("/services", data);
//       return res.data.data;
//     } catch (err) {
//       return rejectWithValue(
//         err.response?.data?.message || "Failed to create service"
//       );
//     }
//   }
// );

// /* ================================
//    UPDATE SERVICE
// ================================ */
// export const updateService = createAsyncThunk(
//   "services/update",
//   async ({ id, data }, { rejectWithValue }) => {
//     try {
//       const res = await api.put(`/services/${id}`, data);
//       return res.data.data;
//     } catch (err) {
//       return rejectWithValue(
//         err.response?.data?.message || "Failed to update service"
//       );
//     }
//   }
// );

// /* ================================
//    DELETE SERVICE (PERMANENT)
// ================================ */
// export const deleteService = createAsyncThunk(
//   "services/delete",
//   async (id, { rejectWithValue }) => {
//     try {
//       await api.delete(`/services/${id}`);
//       return id;
//     } catch (err) {
//       return rejectWithValue(
//         err.response?.data?.message || "Failed to delete service"
//       );
//     }
//   }
// );

// /* ================================
//    SLICE
// ================================ */
// const serviceSlice = createSlice({
//   name: "services",
//   initialState: {
//     list: [],
//     loading: false,
//     error: null,
//     creating: false,
//     updatingId: null,
//     deletingId: null,
//   },

//   reducers: {
//     clearServiceError: (state) => {
//       state.error = null;
//     },
//   },

//   extraReducers: (builder) => {
//     builder
//       /* ---------- FETCH ---------- */
//       .addCase(fetchServices.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchServices.fulfilled, (state, action) => {
//         state.loading = false;
//         state.list = action.payload || [];
//       })
//       .addCase(fetchServices.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       /* ---------- CREATE ---------- */
//       .addCase(createService.pending, (state) => {
//         state.creating = true;
//       })
//       .addCase(createService.fulfilled, (state, action) => {
//         state.creating = false;
//         state.list.unshift(action.payload);
//       })
//       .addCase(createService.rejected, (state, action) => {
//         state.creating = false;
//         state.error = action.payload;
//       })

//       /* ---------- UPDATE ---------- */
//       .addCase(updateService.pending, (state, action) => {
//         state.updatingId = action.meta.arg.id;
//       })
//       .addCase(updateService.fulfilled, (state, action) => {
//         state.updatingId = null;
//         const idx = state.list.findIndex(
//           (s) => s._id === action.payload._id
//         );
//         if (idx !== -1) state.list[idx] = action.payload;
//       })
//       .addCase(updateService.rejected, (state, action) => {
//         state.updatingId = null;
//         state.error = action.payload;
//       })

//       /* ---------- DELETE ---------- */
//       .addCase(deleteService.pending, (state, action) => {
//         state.deletingId = action.meta.arg;
//       })
//       .addCase(deleteService.fulfilled, (state, action) => {
//         state.deletingId = null;
//         state.list = state.list.filter(
//           (s) => s._id !== action.payload
//         );
//       })
//       .addCase(deleteService.rejected, (state, action) => {
//         state.deletingId = null;
//         state.error = action.payload;
//       });
//   },
// });

// /* ================================
//    EXPORTS
// ================================ */
// export const { clearServiceError } = serviceSlice.actions;
// export default serviceSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/axios";

/* ================================
   FETCH SERVICES
================================ */
export const fetchServices = createAsyncThunk(
  "services/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/services");
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch services"
      );
    }
  }
);

/* ================================
   CREATE SERVICE
================================ */
export const createService = createAsyncThunk(
  "services/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/services", data);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create service"
      );
    }
  }
);

/* ================================
   UPDATE SERVICE
================================ */
export const updateService = createAsyncThunk(
  "services/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/services/${id}`, data);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update service"
      );
    }
  }
);

/* ================================
   DELETE SERVICE (PERMANENT)
================================ */
export const deleteService = createAsyncThunk(
  "services/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/services/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete service"
      );
    }
  }
);

/* ================================
   SLICE
================================ */
const serviceSlice = createSlice({
  name: "services",
  initialState: {
    list: [],
    loading: false,
    error: null,
    creating: false,
    updatingId: null,
    deletingId: null,
  },

  reducers: {
    clearServiceError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      /* ---------- FETCH ---------- */
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload || [];
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- CREATE ---------- */
      .addCase(createService.pending, (state) => {
        state.creating = true;
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.creating = false;
        state.list.unshift(action.payload);
      })
      .addCase(createService.rejected, (state, action) => {
        state.creating = false;
        state.error = action.payload;
      })

      /* ---------- UPDATE ---------- */
      .addCase(updateService.pending, (state, action) => {
        state.updatingId = action.meta.arg.id;
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.updatingId = null;
        const idx = state.list.findIndex(
          (s) => s._id === action.payload._id
        );
        if (idx !== -1) state.list[idx] = action.payload;
      })
      .addCase(updateService.rejected, (state, action) => {
        state.updatingId = null;
        state.error = action.payload;
      })

      /* ---------- DELETE ---------- */
      .addCase(deleteService.pending, (state, action) => {
        state.deletingId = action.meta.arg;
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.deletingId = null;
        state.list = state.list.filter(
          (s) => s._id !== action.payload
        );
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.deletingId = null;
        state.error = action.payload;
      });
  },
});

/* ================================
   EXPORTS
================================ */
export const { clearServiceError } = serviceSlice.actions;
export default serviceSlice.reducer;

