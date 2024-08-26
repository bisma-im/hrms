import apiClient from 'api/apiClient';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Thunk to handle user login
export const authenticateUser = createAsyncThunk( 'auth/authenticateUser', 
    async ({ email, password, role }, thunkAPI) => {
      try {
        const response = await apiClient.post('/api/auth/login', { email, password, role });
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
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

export const saveTokenInLocalStorage = (tokenDetails) => {
    const now = new Date();
    const expirationDate = new Date(now.getTime() + tokenDetails.expiresIn * 1000);
    console.log(expirationDate);
    localStorage.setItem('token', tokenDetails.token);
    localStorage.setItem('expirationDate', expirationDate.toISOString());
    localStorage.setItem('user', JSON.stringify(tokenDetails.user));
    localStorage.setItem('loggedIn', true);
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('user');
    return {
        type: 'LOGOUT'
    };
};

export const autoCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const user = JSON.parse(localStorage.getItem('user'));
                dispatch(authenticateUser.fulfilled({ user, token }));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    };
};