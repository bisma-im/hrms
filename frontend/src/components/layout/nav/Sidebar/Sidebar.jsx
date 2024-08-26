import { toggleSidebar } from 'features/nav/sidebarSlice';
import { logout } from 'features/auth/authSlice';
import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nav } from 'react-bootstrap';
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaSignOutAlt } from 'react-icons/fa';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { IconContext } from 'react-icons';
import SidebarItem from './SidebarItem';
import menuItems from 'components/layout/nav/Sidebar/MenuList';
import { useTheme } from 'context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const { sidebarOpen } = useSelector(state => state.sidebar);
  const collapsed = !sidebarOpen;
  const { toggleTheme } = useTheme();
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleToggleSidebar = useCallback(() => {
    dispatch(toggleSidebar());
  }, [dispatch]);

  const toggleSubmenu = useCallback((id) => {
    setOpenSubmenu(prev => (prev === id ? null : id));
  }, []); 
  

  return (
    <IconContext.Provider value={{ color: "white", size: "1.5em" }}>
      <div className={`sidebar ${collapsed ? 'collapsed' : 'expanded'}`}>
        <div className="sidebar-toggle" onClick={handleToggleSidebar}>
          {collapsed ? <FaAngleDoubleRight className='arrow' /> : <FaAngleDoubleLeft className='arrow'/>}
        </div>
        <Scrollbars
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
          style={{ height: 'calc(100vh - 10px)' }}
          renderThumbVertical={({ style, ...props }) =>
            <div {...props} style={{ ...style, backgroundColor: '#ccd9f1', borderRadius: '6px' }} />
          }
        >
          <Nav defaultActiveKey="/home" className="flex-column">
            {menuItems.map(item => (
              <SidebarItem 
                key={item.id}
                item={item}
                toggleTheme={toggleTheme}
                collapsed={collapsed}
                toggleSubmenu={toggleSubmenu}
                openSubmenu={openSubmenu === item.id}
              />
            ))}
            <Nav.Link className="sidebar-item" onClick={handleLogout}>
              <FaSignOutAlt className='icon' />
              {!collapsed && <span className='text'>Logout</span>}
            </Nav.Link>
          </Nav>
        </Scrollbars>
      </div>
    </IconContext.Provider>
  );
};

export default Sidebar;
