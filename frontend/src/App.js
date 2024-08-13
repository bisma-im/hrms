import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'context/ThemeContext';
import ApplyTheme from 'components/common/theme/ApplyTheme';
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
