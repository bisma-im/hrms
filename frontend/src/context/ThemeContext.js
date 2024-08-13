import React, { createContext, useContext, useState, useMemo } from 'react';
import { lightTheme, darkTheme } from 'config/themes';

// Create context
const ThemeContext = createContext();

// Provider component
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => setTheme(theme.mode === 'light' ? darkTheme : lightTheme);

  // Memorize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => {
    return { theme, toggleTheme };
  }, [theme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use theme
export function useTheme() {
  return useContext(ThemeContext);
}
