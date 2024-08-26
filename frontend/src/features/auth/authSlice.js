import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authenticateUser, logout as apiLogout, autoCheckState } from './authService';
const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || {},
  token: localStorage.getItem('token') || null,
  errors: {},
  isLoading: false,
  isAuthenticated: localStorage.getItem('loggedIn') || false,
};

// Thunk to handle automatic session check
export const autoLogin = createAsyncThunk(
  'auth/autoLogin',
  async (_, thunkAPI) => {
    thunkAPI.dispatch(autoCheckState());
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginFailure: (state, action) => {
      state.errors = action.payload;
      state.isLoading = false;
    },
    logout: (state) => {
      window.localStorage.removeItem('role');
      window.localStorage.removeItem('email');
      window.localStorage.setItem('loggedIn', false);
      state.user = null;
      state.errors = {};
      state.token = null;
      state.isAuthenticated = false;
      apiLogout();
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(authenticateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload;
        state.isAuthenticated = false;
      });
  }
});

// Action creators are generated for each case reducer function
export const { logout } = authSlice.actions;

export default authSlice.reducer;
