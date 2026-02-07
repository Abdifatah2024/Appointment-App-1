// // import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// // import api from "../../../utils/axios";

// // /* ================================
// //    FETCH CUSTOMERS
// // ================================ */
// // export const fetchCustomers = createAsyncThunk(
// //   "customers/fetchAll",
// //   async (_, { rejectWithValue }) => {
// //     try {
// //       const res = await api.get("/customers");
// //       return res.data.data;
// //     } catch (err) {
// //       return rejectWithValue(
// //         err.response?.data?.message || "Failed to fetch customers"
// //       );
// //     }
// //   }
// // );

// // /* ================================
// //    CREATE CUSTOMER
// // ================================ */
// // export const createCustomer = createAsyncThunk(
// //   "customers/create",
// //   async (data, { rejectWithValue }) => {
// //     try {
// //       const res = await api.post("/customers", data);
// //       return res.data.data;
// //     } catch (err) {
// //       return rejectWithValue(
// //         err.response?.data?.message || "Failed to create customer"
// //       );
// //     }
// //   }
// // );

// // /* ================================
// //    UPDATE CUSTOMER
// // ================================ */
// // export const updateCustomer = createAsyncThunk(
// //   "customers/update",
// //   async ({ id, data }, { rejectWithValue }) => {
// //     try {
// //       const res = await api.put(`/customers/${id}`, data);
// //       return res.data.data;
// //     } catch (err) {
// //       return rejectWithValue(
// //         err.response?.data?.message || "Failed to update customer"
// //       );
// //     }
// //   }
// // );

// // /* ================================
// //    DELETE CUSTOMER (PERMANENT)
// // ================================ */
// // export const deleteCustomer = createAsyncThunk(
// //   "customers/delete",
// //   async (id, { rejectWithValue }) => {
// //     try {
// //       await api.delete(`/customers/${id}`);
// //       return id;
// //     } catch (err) {
// //       return rejectWithValue(
// //         err.response?.data?.message || "Failed to delete customer"
// //       );
// //     }
// //   }
// // );

// // /* ================================
// //    SLICE
// // ================================ */
// // const customerSlice = createSlice({
// //   name: "customers",
// //   initialState: {
// //     list: [],
// //     loading: false,
// //     error: null,
// //     creating: false,
// //     updatingId: null,
// //     deletingId: null,
// //   },

// //   reducers: {
// //     clearCustomerError: (state) => {
// //       state.error = null;
// //     },
// //   },

// //   extraReducers: (builder) => {
// //     builder
// //       /* ---------- FETCH ---------- */
// //       .addCase(fetchCustomers.pending, (state) => {
// //         state.loading = true;
// //       })
// //       .addCase(fetchCustomers.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.list = action.payload || [];
// //       })
// //       .addCase(fetchCustomers.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload;
// //       })

// //       /* ---------- CREATE ---------- */
// //       .addCase(createCustomer.pending, (state) => {
// //         state.creating = true;
// //       })
// //       .addCase(createCustomer.fulfilled, (state, action) => {
// //         state.creating = false;
// //         state.list.unshift(action.payload);
// //       })
// //       .addCase(createCustomer.rejected, (state, action) => {
// //         state.creating = false;
// //         state.error = action.payload;
// //       })

// //       /* ---------- UPDATE ---------- */
// //       .addCase(updateCustomer.pending, (state, action) => {
// //         state.updatingId = action.meta.arg.id;
// //       })
// //       .addCase(updateCustomer.fulfilled, (state, action) => {
// //         state.updatingId = null;
// //         const idx = state.list.findIndex(
// //           (c) => c._id === action.payload._id
// //         );
// //         if (idx !== -1) state.list[idx] = action.payload;
// //       })
// //       .addCase(updateCustomer.rejected, (state, action) => {
// //         state.updatingId = null;
// //         state.error = action.payload;
// //       })

// //       /* ---------- DELETE ---------- */
// //       .addCase(deleteCustomer.pending, (state, action) => {
// //         state.deletingId = action.meta.arg;
// //       })
// //       .addCase(deleteCustomer.fulfilled, (state, action) => {
// //         state.deletingId = null;
// //         state.list = state.list.filter(
// //           (c) => c._id !== action.payload
// //         );
// //       })
// //       .addCase(deleteCustomer.rejected, (state, action) => {
// //         state.deletingId = null;
// //         state.error = action.payload;
// //       });
// //   },
// // });

// // /* ================================
// //    EXPORTS
// // ================================ */
// // export const { clearCustomerError } = customerSlice.actions;
// // export default customerSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../../../utils/axios";

// /* ================================
//    FETCH CUSTOMERS
// ================================ */
// export const fetchCustomers = createAsyncThunk(
//   "customers/fetchAll",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await api.get("/customers");
//       return res.data.data;
//     } catch (err) {
//       return rejectWithValue(
//         err.response?.data?.message || "Failed to fetch customers"
//       );
//     }
//   }
// );

// /* ================================
//    SEARCH CUSTOMERS WITH STATUS (NEW)
//    /customers/search-with-status?q=
// ================================ */
// export const searchCustomersWithStatus = createAsyncThunk(
//   "customers/searchWithStatus",
//   async (query, { rejectWithValue }) => {
//     try {
//       if (!query || query.trim().length < 2) return [];
//       const res = await api.get(
//         `/customers/search-with-status?q=${query}`
//       );
//       return res.data.data;
//     } catch (err) {
//       return rejectWithValue(
//         err.response?.data?.message ||
//           "Failed to search customers with status"
//       );
//     }
//   }
// );

// /* ================================
//    CREATE CUSTOMER
// ================================ */
// export const createCustomer = createAsyncThunk(
//   "customers/create",
//   async (data, { rejectWithValue }) => {
//     try {
//       const res = await api.post("/customers", data);
//       return res.data.data;
//     } catch (err) {
//       return rejectWithValue(
//         err.response?.data?.message || "Failed to create customer"
//       );
//     }
//   }
// );

// /* ================================
//    UPDATE CUSTOMER
// ================================ */
// export const updateCustomer = createAsyncThunk(
//   "customers/update",
//   async ({ id, data }, { rejectWithValue }) => {
//     try {
//       const res = await api.put(`/customers/${id}`, data);
//       return res.data.data;
//     } catch (err) {
//       return rejectWithValue(
//         err.response?.data?.message || "Failed to update customer"
//       );
//     }
//   }
// );

// /* ================================
//    DELETE CUSTOMER (PERMANENT)
// ================================ */
// export const deleteCustomer = createAsyncThunk(
//   "customers/delete",
//   async (id, { rejectWithValue }) => {
//     try {
//       await api.delete(`/customers/${id}`);
//       return id;
//     } catch (err) {
//       return rejectWithValue(
//         err.response?.data?.message || "Failed to delete customer"
//       );
//     }
//   }
// );

// /* ================================
//    SLICE
// ================================ */
// const customerSlice = createSlice({
//   name: "customers",
//   initialState: {
//     list: [],
//     loading: false,
//     error: null,

//     creating: false,
//     updatingId: null,
//     deletingId: null,

//     // 🔍 SEARCH WITH STATUS
//     searchResults: [],
//     searching: false,
//   },

//   reducers: {
//     clearCustomerError: (state) => {
//       state.error = null;
//     },
//     clearCustomerSearch: (state) => {
//       state.searchResults = [];
//     },
//   },

//   extraReducers: (builder) => {
//     builder
//       /* ---------- FETCH ---------- */
//       .addCase(fetchCustomers.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchCustomers.fulfilled, (state, action) => {
//         state.loading = false;
//         state.list = action.payload || [];
//       })
//       .addCase(fetchCustomers.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       /* ---------- SEARCH WITH STATUS ---------- */
//       .addCase(searchCustomersWithStatus.pending, (state) => {
//         state.searching = true;
//       })
//       .addCase(searchCustomersWithStatus.fulfilled, (state, action) => {
//         state.searching = false;
//         state.searchResults = action.payload || [];
//       })
//       .addCase(searchCustomersWithStatus.rejected, (state, action) => {
//         state.searching = false;
//         state.error = action.payload;
//       })

//       /* ---------- CREATE ---------- */
//       .addCase(createCustomer.pending, (state) => {
//         state.creating = true;
//       })
//       .addCase(createCustomer.fulfilled, (state, action) => {
//         state.creating = false;
//         state.list.unshift(action.payload);
//       })
//       .addCase(createCustomer.rejected, (state, action) => {
//         state.creating = false;
//         state.error = action.payload;
//       })

//       /* ---------- UPDATE ---------- */
//       .addCase(updateCustomer.pending, (state, action) => {
//         state.updatingId = action.meta.arg.id;
//       })
//       .addCase(updateCustomer.fulfilled, (state, action) => {
//         state.updatingId = null;
//         const idx = state.list.findIndex(
//           (c) => c._id === action.payload._id
//         );
//         if (idx !== -1) state.list[idx] = action.payload;
//       })
//       .addCase(updateCustomer.rejected, (state, action) => {
//         state.updatingId = null;
//         state.error = action.payload;
//       })

//       /* ---------- DELETE ---------- */
//       .addCase(deleteCustomer.pending, (state, action) => {
//         state.deletingId = action.meta.arg;
//       })
//       .addCase(deleteCustomer.fulfilled, (state, action) => {
//         state.deletingId = null;
//         state.list = state.list.filter(
//           (c) => c._id !== action.payload
//         );
//       })
//       .addCase(deleteCustomer.rejected, (state, action) => {
//         state.deletingId = null;
//         state.error = action.payload;
//       });
//   },
// });

// /* ================================
//    EXPORTS
// ================================ */
// export const {
//   clearCustomerError,
//   clearCustomerSearch,
// } = customerSlice.actions;

// export default customerSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/axios";

/* ================================
   FETCH CUSTOMERS
================================ */
export const fetchCustomers = createAsyncThunk(
  "customers/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/customers");
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch customers"
      );
    }
  }
);

/* ================================
   SEARCH CUSTOMERS WITH STATUS
   /customers/search-with-status?q=
================================ */
export const searchCustomersWithStatus = createAsyncThunk(
  "customers/searchWithStatus",
  async (query, { rejectWithValue }) => {
    try {
      if (!query || query.trim().length < 2) return [];
      const res = await api.get(
        `/customers/search-with-status?q=${query}`
      );
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
          "Failed to search customers with status"
      );
    }
  }
);

/* ================================
   CREATE CUSTOMER
   (supports gender: MALE | FEMALE)
================================ */
export const createCustomer = createAsyncThunk(
  "customers/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/customers", data);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create customer"
      );
    }
  }
);

/* ================================
   UPDATE CUSTOMER
================================ */
export const updateCustomer = createAsyncThunk(
  "customers/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/customers/${id}`, data);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update customer"
      );
    }
  }
);

/* ================================
   DELETE CUSTOMER (PERMANENT)
================================ */
export const deleteCustomer = createAsyncThunk(
  "customers/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/customers/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete customer"
      );
    }
  }
);

/* ================================
   SLICE
================================ */
const customerSlice = createSlice({
  name: "customers",

  initialState: {
    list: [],
    loading: false,
    error: null,

    creating: false,
    updatingId: null,
    deletingId: null,

    // 🔍 Search with status
    searchResults: [],
    searching: false,
  },

  reducers: {
    clearCustomerError: (state) => {
      state.error = null;
    },
    clearCustomerSearch: (state) => {
      state.searchResults = [];
    },
  },

  extraReducers: (builder) => {
    builder
      /* ---------- FETCH ---------- */
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload || [];
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- SEARCH ---------- */
      .addCase(searchCustomersWithStatus.pending, (state) => {
        state.searching = true;
      })
      .addCase(searchCustomersWithStatus.fulfilled, (state, action) => {
        state.searching = false;
        state.searchResults = action.payload || [];
      })
      .addCase(searchCustomersWithStatus.rejected, (state, action) => {
        state.searching = false;
        state.error = action.payload;
      })

      /* ---------- CREATE ---------- */
      .addCase(createCustomer.pending, (state) => {
        state.creating = true;
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.creating = false;
        state.list.unshift(action.payload);
      })
      .addCase(createCustomer.rejected, (state, action) => {
        state.creating = false;
        state.error = action.payload;
      })

      /* ---------- UPDATE ---------- */
      .addCase(updateCustomer.pending, (state, action) => {
        state.updatingId = action.meta.arg.id;
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.updatingId = null;
        const index = state.list.findIndex(
          (c) => c._id === action.payload._id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.updatingId = null;
        state.error = action.payload;
      })

      /* ---------- DELETE ---------- */
      .addCase(deleteCustomer.pending, (state, action) => {
        state.deletingId = action.meta.arg;
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.deletingId = null;
        state.list = state.list.filter(
          (c) => c._id !== action.payload
        );
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.deletingId = null;
        state.error = action.payload;
      });
  },
});

/* ================================
   EXPORTS
================================ */
export const {
  clearCustomerError,
  clearCustomerSearch,
} = customerSlice.actions;

export default customerSlice.reducer;
