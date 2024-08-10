import React, { createContext, useContext, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { logout as logoutAction } from 'features/auth/authSlice';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
    const dispatch = useDispatch();

    const logout = useCallback(() => {
        dispatch(logoutAction());
        // Optionally add navigation to login page here if not using a redirect in Redux
    }, [dispatch]);


    return (
        <AppContext.Provider value={{ logout }}>
            {children}
        </AppContext.Provider>
    );
};
