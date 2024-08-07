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
  user: {},
  errors: {},
  isLoading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state, action) => {
        const { email, password, role } = action.payload;
        if (email === 'admin@gmail.com' && password === 'admin' && role === 'admin') {
          // Simulate successful login
          state.user = { email: email, role: role };
          state.errors = null;
        } else {
          // Simulate login failure
          state.errors = 'Invalid email or password';
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
      state.user = null;
      state.errors = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginStart, loginUser, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;
