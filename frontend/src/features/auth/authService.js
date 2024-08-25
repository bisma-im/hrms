import apiClient from 'api/apiClient';
import { authenticateUser } from 'features/auth/authSlice';

export const login = (email, password, role) => {
    return apiClient.post('/api/auth/login', { email, password, role });
};

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