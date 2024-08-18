import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  errors: {},
  isLoading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state, action) => {
        const { email, password, role } = action.payload;
        console.log('Setting user in Redux state:', action.payload);
        if (email === 'admin@gmail.com' && password === 'admin' && role === 'admin') {
          // Simulate successful login
          const userData = { email: email, role: role };
          window.localStorage.setItem('role', role);
          window.localStorage.setItem('loggedIn', true);
          window.localStorage.setItem('email', email);
          state.user = userData;
          state.errors = null;
        } else {
          // Simulate login failure
          state.user = null;
          state.errors = { message: 'Invalid email or password' };
        }
        state.isLoading = false; // Update if it was set to true elsewhere
    },
    loginStart: (state) => {
      state.isLoading = true;
    },
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
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginStart, loginUser, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;
