// src/components/ApplyTheme.js
import { useEffect } from 'react';
import { useTheme } from 'context/ThemeContext';

const ApplyTheme = () => {
  const { theme } = useTheme();

  useEffect(() => {
    Object.keys(theme).forEach(key => {
      document.body.style.setProperty(`--${key}-color`, theme[key]);
    });
  }, [theme]);

  return null;
};

export default ApplyTheme;
