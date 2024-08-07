import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from 'routes/AppRoutes';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'assets/css/style.css';

function App() {
    const theme = useSelector(state => state.theme.theme); // Fetch theme from Redux

    useEffect(() => {
        // Update CSS variables
        document.body.style.setProperty('--primary-color', theme.primary);
        document.body.style.setProperty('--secondary-color', theme.secondary);
        document.body.style.setProperty('--background-color', theme.background);
        document.body.style.setProperty('--text-color', theme.text);
        document.body.style.setProperty('--success-color', theme.success);
        document.body.style.setProperty('--error-color', theme.error);
        document.body.style.setProperty('--warning-color', theme.warning);
        document.body.style.setProperty('--whiteorblack-color', theme.whiteorblack);
        document.body.style.setProperty('--sidebarbg-color', theme.sidebarbg);
        document.body.style.setProperty('--sidebaractive-color', theme.sidebaractive);

    }, [theme]);

  return (
    <Router>
      <div className="App">
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
