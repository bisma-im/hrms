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
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        console.log('Found user in localStorage:', storedUser);
        try {
            const parsedUser = JSON.parse(storedUser);
            console.log('Dispatching loginUser with:', parsedUser);
            dispatch(loginUser(parsedUser));
        } catch (error) {
            console.error('Error parsing user from localStorage:', error);
        }
    } else {
        console.log('No user found in localStorage.');
    }
}, [dispatch]);
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
