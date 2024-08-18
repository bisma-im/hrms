import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'context/ThemeContext';
import ApplyTheme from 'components/common/theme/ApplyTheme';
import { loginUser } from 'features/auth/authSlice';
import AppRoutes from 'routes/AppRoutes';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'assets/css/style.css';

function App() {
  return (
    <ThemeProvider>
        <Router>
          <ApplyTheme />
          <div className="App">
            <AppRoutes />
          </div>
        </Router>
    </ThemeProvider>
  );
}

export default App;
