// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../../../utils/axios";

// const TOKEN_KEY = "appointment_app_token";

// /* ================================
//    LOGIN
// ================================ */
// export const loginUser = createAsyncThunk(
//   "auth/login",
//   async (data, { rejectWithValue }) => {
//     try {
//       const res = await api.post("/users/login", data);
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || "Login failed");
//     }
//   }
// );

// /* ================================
//    FETCH CURRENT USER
// ================================ */
// export const fetchMe = createAsyncThunk(
//   "auth/fetchMe",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await api.get("/users/me");
//       return res.data; // <- backend response
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || "Session expired");
//     }
//   }
// );

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     user: null,
//     token: localStorage.getItem(TOKEN_KEY),
//     loading: true,
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
//       // ========== LOGIN ==========
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;

//         // ✅ token
//         const token =
//           action.payload?.token ||
//           action.payload?.data?.token ||
//           action.payload?.accessToken ||
//           action.payload?.data?.accessToken;

//         // ✅ user
//         const user =
//           action.payload?.user ||
//           action.payload?.data?.user ||
//           action.payload?.data ||
//           null;

//         state.token = token || null;
//         state.user = user;

//         if (token) localStorage.setItem(TOKEN_KEY, token);
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // ========== FETCH ME ==========
//       .addCase(fetchMe.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchMe.fulfilled, (state, action) => {
//         // ✅ backend could return:
//         // 1) user object
//         // 2) { success:true, data:user }
//         // 3) { success:true, user:user }
//         const user =
//           action.payload?.data ||
//           action.payload?.user ||
//           action.payload;

//         state.user = user;
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

// export const { logout, stopLoading } = authSlice.actions;
// export default authSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/axios";

const TOKEN_KEY = "appointment_app_token";

/* ================================
   LOGIN
================================ */
export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/users/login", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

/* ================================
   FETCH CURRENT USER (/users/me)
================================ */
export const fetchMe = createAsyncThunk(
  "auth/fetchMe",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/users/me");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Session expired");
    }
  }
);

/* ================================
   UPDATE MY PROFILE (/users/profile)
   Body: { fullName }
================================ */
export const updateMyProfile = createAsyncThunk(
  "auth/updateMyProfile",
  async ({ fullName }, { rejectWithValue }) => {
    try {
      const res = await api.put("/users/profile", { fullName });
      return res.data; // { success:true, user } OR { success:true, data:user } OR user
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Update failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem(TOKEN_KEY),
    loading: true,
    error: null,

    // ✅ profile states
    profileSaving: false,
    profileError: null,
    profileSuccess: null,
  },

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      state.profileSaving = false;
      state.profileError = null;
      state.profileSuccess = null;
      localStorage.removeItem(TOKEN_KEY);
    },
    stopLoading: (state) => {
      state.loading = false;
    },
    clearProfileMessage: (state) => {
      state.profileError = null;
      state.profileSuccess = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // ========== LOGIN ==========
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        const token =
          action.payload?.token ||
          action.payload?.data?.token ||
          action.payload?.accessToken ||
          action.payload?.data?.accessToken;

        const user =
          action.payload?.user ||
          action.payload?.data?.user ||
          action.payload?.data ||
          null;

        state.token = token || null;
        state.user = user;

        if (token) localStorage.setItem(TOKEN_KEY, token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ========== FETCH ME ==========
      .addCase(fetchMe.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        const user = action.payload?.data || action.payload?.user || action.payload;
        state.user = user;
        state.loading = false;
      })
      .addCase(fetchMe.rejected, (state, action) => {
        state.user = null;
        state.token = null;
        state.loading = false;
        state.error = action.payload || "Session expired";
        localStorage.removeItem(TOKEN_KEY);
      })

      // ========== UPDATE PROFILE ==========
      .addCase(updateMyProfile.pending, (state) => {
        state.profileSaving = true;
        state.profileError = null;
        state.profileSuccess = null;
      })
      .addCase(updateMyProfile.fulfilled, (state, action) => {
        state.profileSaving = false;

        const updatedUser =
          action.payload?.user ||
          action.payload?.data ||
          action.payload;

        state.user = updatedUser;
        state.profileSuccess = "Profile updated successfully ✅";
      })
      .addCase(updateMyProfile.rejected, (state, action) => {
        state.profileSaving = false;
        state.profileError = action.payload || "Update failed";
      });
  },
});

export const { logout, stopLoading, clearProfileMessage } = authSlice.actions;
export default authSlice.reducer;

