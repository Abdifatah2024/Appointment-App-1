// // import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// // import api from "../../../utils/axios";

// // /* ================================
// //    CONSTANTS
// // ================================ */
// // const TOKEN_KEY = "appointment_app_token";

// // /* ================================
// //    LOGIN THUNK
// // ================================ */
// // export const loginUser = createAsyncThunk(
// //   "auth/login",
// //   async (data, { rejectWithValue }) => {
// //     try {
// //       const res = await api.post("/users/login", data);
// //       // expected: { token, user }
// //       return res.data;
// //     } catch (err) {
// //       return rejectWithValue(
// //         err.response?.data?.message || "Login failed"
// //       );
// //     }
// //   }
// // );

// // /* ================================
// //    SLICE
// // ================================ */
// // const authSlice = createSlice({
// //   name: "auth",
// //   initialState: {
// //     user: null,
// //     token: localStorage.getItem(TOKEN_KEY),
// //     loading: false,
// //     error: null,
// //   },

// //   reducers: {
// //     logout: (state) => {
// //       state.user = null;
// //       state.token = null;
// //       state.loading = false;
// //       state.error = null;

// //       localStorage.removeItem(TOKEN_KEY);
// //     },
// //   },

// //   extraReducers: (builder) => {
// //     builder

// //       // LOGIN PENDING
// //       .addCase(loginUser.pending, (state) => {
// //         state.loading = true;
// //         state.error = null;
// //       })

// //       // LOGIN SUCCESS
// //       .addCase(loginUser.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.token = action.payload.token;
// //         state.user = action.payload.user;

// //         localStorage.setItem(TOKEN_KEY, action.payload.token);
// //       })

// //       // LOGIN FAILED
// //       .addCase(loginUser.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload;
// //       });
// //   },
// // });

// // /* ================================
// //    EXPORTS
// // ================================ */
// // export const { logout } = authSlice.actions;
// // export default authSlice.reducer;
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../../../utils/axios";

// /* ================================
//    CONSTANTS
// ================================ */
// const TOKEN_KEY = "appointment_app_token";

// /* ================================
//    LOGIN THUNK
// ================================ */
// export const loginUser = createAsyncThunk(
//   "auth/login",
//   async (data, { rejectWithValue }) => {
//     try {
//       const res = await api.post("/users/login", data);
//       // expected response: { token, user }
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(
//         err.response?.data?.message || "Login failed"
//       );
//     }
//   }
// );

// /* ================================
//    FETCH CURRENT USER (IMPORTANT)
// ================================ */
// export const fetchMe = createAsyncThunk(
//   "auth/fetchMe",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await api.get("/users/me");
//       // expected response: user object
//       return res.data;
//     } catch (err) {
//       return rejectWithValue("Session expired");
//     }
//   }
// );

// /* ================================
//    SLICE
// ================================ */
// const authSlice = createSlice({
//   name: "auth",

//   initialState: {
//     user: null,
//     token: localStorage.getItem(TOKEN_KEY),
//     loading: true, // 🔴 MUST start as true
//     error: null,
//   },

//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       state.loading = false;
//       state.error = null;

//       localStorage.removeItem(TOKEN_KEY);
//     },

//     stopLoading: (state) => {
//       state.loading = false;
//     },
//   },

//   extraReducers: (builder) => {
//     builder

//       /* ================= LOGIN ================= */

//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })

//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.token = action.payload.token;
//         state.user = action.payload.user;

//         localStorage.setItem(TOKEN_KEY, action.payload.token);
//       })

//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       /* ================= FETCH ME ================= */

//       .addCase(fetchMe.pending, (state) => {
//         state.loading = true;
//       })

//       .addCase(fetchMe.fulfilled, (state, action) => {
//         state.user = action.payload;
//         state.loading = false;
//       })

//       .addCase(fetchMe.rejected, (state) => {
//         state.user = null;
//         state.token = null;
//         state.loading = false;

//         localStorage.removeItem(TOKEN_KEY);
//       });
//   },
// });

// /* ================================
//    EXPORTS
// ================================ */
// export const { logout, stopLoading } = authSlice.actions;
// export default authSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/axios";

/* ================================
   CONSTANTS
================================ */
const TOKEN_KEY = "appointment_app_token";

/* ================================
   LOGIN THUNK
================================ */
export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/users/login", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Login failed"
      );
    }
  }
);

/* ================================
   FETCH CURRENT USER
================================ */
export const fetchMe = createAsyncThunk(
  "auth/fetchMe",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/users/me");
      return res.data;
    } catch (err) {
      return rejectWithValue("Session expired");
    }
  }
);

/* ================================
   SLICE
================================ */
const authSlice = createSlice({
  name: "auth",

  initialState: {
    user: null,
    token: localStorage.getItem(TOKEN_KEY),
    loading: true, // IMPORTANT
    error: null,
  },

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;

      localStorage.removeItem(TOKEN_KEY);
    },

    stopLoading: (state) => {
      state.loading = false;
    },
  },

  extraReducers: (builder) => {
    builder

      /* ================= LOGIN ================= */

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        // ✅ SAFE extraction (handles any backend response)
        const token =
          action.payload.token ||
          action.payload.data?.token;

        const user =
          action.payload.user ||
          action.payload.data?.user;

        state.token = token;
        state.user = user;

        if (token) {
          localStorage.setItem(TOKEN_KEY, token);
        }
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= FETCH ME ================= */

      .addCase(fetchMe.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchMe.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })

      .addCase(fetchMe.rejected, (state) => {
        state.user = null;
        state.token = null;
        state.loading = false;

        localStorage.removeItem(TOKEN_KEY);
      });
  },
});

/* ================================
   EXPORTS
================================ */
export const { logout, stopLoading } = authSlice.actions;
export default authSlice.reducer;




