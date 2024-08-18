import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//     auth: {
//         email: '',
//         idToken: '',
//         localId: '',
//         expiresIn: '',
//         refreshToken: '',
//     },
//     errorMessage: '',
//     successMessage: '',
//     showLoading: false,
// };

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
    // loginSuccess: (state, action) => {
    //   state.user = action.payload;
    //   state.errors = {};
    //   state.isLoading = false;
    //   console.log('login success');
    // },
    loginFailure: (state, action) => {
      state.errors = action.payload;
      state.isLoading = false;
    },
    logout: (state) => {
      localStorage.removeItem('user');
      state.user = null;
      state.errors = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginStart, loginUser, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;
