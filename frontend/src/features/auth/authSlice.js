import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login as apiLogin, saveTokenInLocalStorage, logout as apiLogout, checkAuthTimeout, autoCheckState } from './authService';
const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || {},
  token: localStorage.getItem('token') || null,
  errors: {},
  isLoading: false,
  isAuthenticated: localStorage.getItem('loggedIn') || false,
};

// Thunk to handle user login
export const authenticateUser = createAsyncThunk(
  'auth/authenticateUser',
  async ({ email, password, role }, thunkAPI) => {
    console.log('loggin in user in thunk')
    try {
      const response = await apiLogin(email, password, role);
      console.log("API Response:", response.data);
      saveTokenInLocalStorage({ token: response.data.token, expiresIn: response.data.expiresIn, user: response.data.user });
      thunkAPI.dispatch(checkAuthTimeout(response.data.expiresIn));
      if (response.status === 200) {
        return {
          user: response.data.user,
          token: response.data.token,
          expiresIn: response.data.expiresIn
        };
      } else {
        return thunkAPI.rejectWithValue(response.data);
      }
    } catch (error) {
      console.log("Error during API call:", error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

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


// export const selectUser = (state) => state.user;

// Action creators are generated for each case reducer function
export const { logout } = authSlice.actions;

export default authSlice.reducer;
